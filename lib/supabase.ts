import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database (aligns with `public.waitlist`; omit columns you don’t use)
export interface WaitlistEntry {
  id: string
  email: string
  phone?: string | null
  role: string
  location?: string | null
  created_at: string
  updated_at?: string
}
