import { createSupabaseAdmin } from '@/lib/supabase'
import InboxClient from './InboxClient'

export const dynamic = 'force-dynamic'

export type ContactWithMeta = {
  id: string
  tenant_id: string
  wa_id: string
  full_name: string | null
  last_message_body: string | null
  last_message_at: string | null
  last_message_direction: string | null
}

export default async function InboxPage() {
  const supabase = createSupabaseAdmin()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID ?? ''

  // Kontaktları gətir
  const { data: contacts } = await supabase
    .from('contacts')
    .select('id, tenant_id, wa_id, full_name')
    .eq('tenant_id', tenantId)

  // Son mesajları gətir (kontakt başına son mesajı tapmaq üçün)
  const { data: recentMessages } = await supabase
    .from('messages')
    .select('id, contact_id, direction, body, created_at')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(2000)

  // Hər kontakt üçün ən son mesajı tap
  const latestByContact = new Map<
    string,
    { body: string; direction: string; created_at: string }
  >()
  for (const msg of recentMessages ?? []) {
    if (!latestByContact.has(msg.contact_id)) {
      latestByContact.set(msg.contact_id, {
        body: msg.body,
        direction: msg.direction,
        created_at: msg.created_at,
      })
    }
  }

  // Kontaktları son mesaj vaxtına görə sırala
  const contactsWithMeta: ContactWithMeta[] = (contacts ?? [])
    .map((c) => ({
      ...c,
      last_message_body: latestByContact.get(c.id)?.body ?? null,
      last_message_at: latestByContact.get(c.id)?.created_at ?? null,
      last_message_direction: latestByContact.get(c.id)?.direction ?? null,
    }))
    .sort((a, b) => {
      if (!a.last_message_at) return 1
      if (!b.last_message_at) return -1
      return (
        new Date(b.last_message_at).getTime() -
        new Date(a.last_message_at).getTime()
      )
    })

  return <InboxClient initialContacts={contactsWithMeta} tenantId={tenantId} />
}
