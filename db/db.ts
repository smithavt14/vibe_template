import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "@/lib/env"
import * as schema from "@/db/schema"

// Handle missing environment configuration gracefully
const getDatabaseUrl = () => {
  if (!env?.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for direct database access. Please check your environment configuration.")
  }
  return env.DATABASE_URL
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(getDatabaseUrl(), { prepare: false })

export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === "development"
}) 