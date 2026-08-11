const GRAPH_VERSION = 'v23.0'
const BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

// ─── Startup validation ──────────────────────────────────────────────────────
// Fail fast with a clear message rather than a cryptic Meta API error later.
const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID
const META_APP_SECRET = process.env.META_APP_SECRET

if (!META_APP_ID) {
  throw new Error(
    'Missing env var: NEXT_PUBLIC_META_APP_ID — add it to .env.local and to Vercel.'
  )
}
if (!META_APP_SECRET) {
  throw new Error(
    'Missing env var: META_APP_SECRET — add it to .env.local and to Vercel.'
  )
}

/** Exchange a short-lived auth code for an access token. */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const url = new URL(`${BASE}/oauth/access_token`)
  url.searchParams.set('client_id', META_APP_ID)
  url.searchParams.set('client_secret', META_APP_SECRET)
  url.searchParams.set('code', code)

  const res = await fetch(url.toString())
  const data = (await res.json()) as { access_token?: string; error?: unknown }

  if (!data.access_token) {
    throw new Error(`Meta token exchange failed: ${JSON.stringify(data)}`)
  }
  return data.access_token
}

/** Fetch phone number details from the Graph API. */
export async function getPhoneNumberInfo(
  phoneNumberId: string,
  accessToken: string
): Promise<{ display_phone_number?: string; verified_name?: string }> {
  const res = await fetch(`${BASE}/${phoneNumberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return res.json() as Promise<{ display_phone_number?: string; verified_name?: string }>
}

/** Subscribe a WABA to the app webhooks. */
export async function subscribeWabaToApp(
  wabaId: string,
  accessToken: string
): Promise<void> {
  await fetch(`${BASE}/${wabaId}/subscribed_apps`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

/** Register a phone number for WhatsApp Cloud API. */
export async function registerPhoneNumber(
  phoneNumberId: string,
  accessToken: string,
  pin: string
): Promise<void> {
  await fetch(`${BASE}/${phoneNumberId}/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messaging_product: 'whatsapp', pin }),
  })
}
