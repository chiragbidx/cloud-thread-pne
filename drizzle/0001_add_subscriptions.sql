-- Enable pgcrypto for gen_random_uuid (idempotent; will not error if already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "customer" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "plan" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "next_renewal" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique constraint for user+plan per SaaS requirements (prevent duplicate plan per customer, regardless of status)
CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_email_plan_unique" ON "subscriptions" ("email", "plan");