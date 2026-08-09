import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseAdmin } from '@/lib/supabase'
import {
  exchangeCodeForToken,
  getPhoneNumberInfo,
  subscribeWabaToApp,
  registerPhoneNumber,
} from '@/lib/meta'

// E.164: + işarəsi + 7–15 rəqəm
const E164_REGEX = /^\+\d{7,15}$/

// Yalnız rəqəmlər: 10–15 simvol (şəxsi nömrə)
const DIGITS_REGEX = /^\d{10,15}$/

const schema = z.object({
  code: z.string().min(1).max(512),
  waba_id: z.string().min(1).max(64),
  phone_number_id: z.string().min(1).max(64),
  // trim: aparıcı/sonrakı boşluqları sil, sonra uzunluğu yoxla
  company_name: z.string().min(1).max(200).transform((v) => v.trim()).pipe(z.string().min(1, 'Şirkətin adı boş ola bilməz')),
  // Server-side E.164 doğrulaması — frontend bypass-ına qarşı müdafiə
  owner_phone: z
    .string()
    .transform((v) => v.replace(/[^\d+]/g, ''))
    .pipe(z.string().regex(E164_REGEX, 'Yanlış telefon formatı: E.164 tələb olunur')),
  // Şəxsi nömrə: + , boşluq, tire, mötərizə sil → yalnız rəqəmlər
  personal_phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().regex(DIGITS_REGEX, 'Şəxsi nömrə 10–15 rəqəm olmalıdır')),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, waba_id, phone_number_id, company_name, owner_phone, personal_phone } =
      schema.parse(body)

    // Eynilik yoxlaması: hər iki nömrəni yalnız rəqəmlərə çevirib müqayisə et
    const ownerDigits = owner_phone.replace(/\D/g, '')
    if (ownerDigits === personal_phone) {
      return NextResponse.json(
        { error: 'Şəxsi bildiriş nömrəniz biznes WhatsApp nömrənizlə eyni ola bilməz.' },
        { status: 400 }
      )
    }

    // 1. Exchange code for access_token (30-second TTL — do this first!)
    const accessToken = await exchangeCodeForToken(code)

    // 2. Get phone number info (display_phone, verified_name)
    const phoneInfo = await getPhoneNumberInfo(phone_number_id, accessToken)

    // 3. Create tenant in Supabase
    const supabase = createSupabaseAdmin()
    const { data: tenantData, error: tenantError } = await supabase.rpc(
      'fn_create_tenant',
      { p_name: company_name, p_contact_phone: owner_phone }
    )
    if (tenantError) throw tenantError
    const tenantId: string = (tenantData as { tenant_id: string }).tenant_id

    // 4. Subscribe WABA to app webhooks
    await subscribeWabaToApp(waba_id, accessToken)

    // 5. Register phone for Cloud API (may already be registered — that's fine)
    const pin = Math.floor(100000 + Math.random() * 900000).toString()
    try {
      await registerPhoneNumber(phone_number_id, accessToken, pin)
    } catch {
      // Already registered — not an error
    }

    // 6. Upsert wa_accounts record
    const { error: upsertError } = await supabase.from('wa_accounts').upsert(
      {
        tenant_id: tenantId,
        waba_id,
        phone_number_id,
        display_phone: phoneInfo.display_phone_number ?? '',
        verified_name: phoneInfo.verified_name ?? company_name,
        access_token: accessToken,
        webhook_subscribed: true,
        is_active: true,
        // Sahibin şəxsi nömrəsi — bildirişlər üçün (yalnız rəqəmlər)
        owner_phone: personal_phone,
      },
      { onConflict: 'phone_number_id' }
    )
    if (upsertError) throw upsertError

    return NextResponse.json({ success: true, tenant_id: tenantId })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Yanlış məlumat formatı', details: err.flatten() },
        { status: 422 }
      )
    }
    console.error('[whatsapp/connect]', err)
    return NextResponse.json(
      { error: 'Daxili xəta baş verdi' },
      { status: 500 }
    )
  }
}
