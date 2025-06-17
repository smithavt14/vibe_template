import { z } from "zod"

// Client-side environment variables (available on both server and client)
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

// Server-only environment variables
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
})

// Validate client environment variables (works on both server and client)
const clientEnvResult = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
})

// Validate full environment on server-side only
const isServer = typeof window === 'undefined'
const serverEnvResult = isServer ? serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
}) : { success: true, data: {} }

export const clientEnv = clientEnvResult.success ? clientEnvResult.data : null
export const isClientEnvConfigured = clientEnvResult.success

// For backwards compatibility and server-side usage
export const env = isServer && clientEnvResult.success && serverEnvResult.success 
  ? { ...clientEnvResult.data, ...serverEnvResult.data } 
  : clientEnv
export const isEnvConfigured = isServer 
  ? (clientEnvResult.success && serverEnvResult.success)
  : clientEnvResult.success

// Helper function to get safe environment values for client-side use
export const getClientEnv = () => {
  console.log('getClientEnv called - clientEnv object:', clientEnv ? 'EXISTS' : 'NULL')
  console.log('getClientEnv - isClientEnvConfigured:', isClientEnvConfigured)
  
  if (!clientEnv) {
    console.log('getClientEnv - returning empty strings because clientEnv is null')
    return {
      NEXT_PUBLIC_SUPABASE_URL: '',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
    }
  }
  
  const result = {
    NEXT_PUBLIC_SUPABASE_URL: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
  
  console.log('getClientEnv - returning:', {
    NEXT_PUBLIC_SUPABASE_URL: result.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'EMPTY',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: result.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'EMPTY'
  })
  
  return result
}

export type Env = z.infer<typeof clientEnvSchema> & z.infer<typeof serverEnvSchema> 