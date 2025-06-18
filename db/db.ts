import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/db/schema"

// Create a mock database for when DATABASE_URL is not configured
const createMockDb = () => {
  return new Proxy({}, {
    get: () => {
      throw new Error("Database not configured. Please set DATABASE_URL environment variable.")
    }
  })
}

// Handle missing environment configuration gracefully
const getDatabaseConnection = () => {
  // Check if we're on server and have DATABASE_URL
  if (typeof window !== 'undefined') {
    // Client-side - return mock
    return createMockDb()
  }
  
  // Server-side - check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not configured. Database operations will not work.")
    return createMockDb()
  }
  
  try {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(process.env.DATABASE_URL, { prepare: false })
    return drizzle(client, { 
      schema,
      logger: process.env.NODE_ENV === "development"
    })
  } catch (error) {
    console.error("Failed to connect to database:", error)
    return createMockDb()
  }
}

export const db = getDatabaseConnection() 