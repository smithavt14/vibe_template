import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "@/lib/env"
import * as schema from "@/db/schema"

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL || (() => { throw new Error("DATABASE_URL is required for direct database access") })(), { prepare: false })

export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === "development"
}) 