import { createBrowserClient } from "@supabase/ssr"
import { getClientEnv } from "@/lib/env"

export function createClient() {
  console.log('createClient called')
  const clientEnv = getClientEnv()
  
  console.log('createClient - clientEnv received:', {
    NEXT_PUBLIC_SUPABASE_URL: clientEnv.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'EMPTY',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'EMPTY'
  })
  
  console.log('createClient - about to call createBrowserClient with:', {
    url: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    key: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '[REDACTED]' : 'EMPTY'
  })
  
  return createBrowserClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
} 