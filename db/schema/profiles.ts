import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const profilesTable = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique(), // References auth.users(id) - Supabase manages this table
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
})

export type Profile = typeof profilesTable.$inferSelect
export type NewProfile = typeof profilesTable.$inferInsert 