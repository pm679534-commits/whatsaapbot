import { createClient } from '@supabase/supabase-js'

/**
 * Server-side admin client — uses the service_role key.
 * Never import this into client components or expose to the browser.
 */
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

/**
 * Browser-safe client — uses the anon key.
 * Safe to use in client components.
 */
export function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
