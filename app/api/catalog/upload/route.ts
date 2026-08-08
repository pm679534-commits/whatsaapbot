import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  tenant_id: z.string().min(1),
  catalog_text: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tenant_id, catalog_text } = schema.parse(body)

    const WEBHOOK = process.env.CATALOG_WEBHOOK_URL!

    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenant_id, catalog_text }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Yanlış məlumat', details: err.flatten() },
        { status: 422 }
      )
    }
    console.error('[catalog/upload]', err)
    return NextResponse.json({ error: 'Daxili xəta baş verdi' }, { status: 500 })
  }
}
