import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Subscriptions Table Schema
export const subscriptions = pgTable("subscriptions", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  customer: text("customer").notNull(),
  email: text("email").notNull(),
  plan: text("plan").notNull(),
  status: text("status").notNull(),
  price: integer("price").notNull(),
  nextRenewal: text("next_renewal").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});