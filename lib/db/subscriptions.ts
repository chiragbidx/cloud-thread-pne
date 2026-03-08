import { db } from "./client";
import { subscriptions } from "./schema";
import { eq, and, ilike } from "drizzle-orm";

/**
 * Find all subscriptions, optionally filtered by customer, plan, or status
 * @param query - search string to match against customer, plan, and status
 * @returns list of subscriptions
 */
export async function listSubscriptions(query?: string) {
  if (!query) {
    return await db.select().from(subscriptions).orderBy(subscriptions.createdAt);
  }
  // Simple search — filter by customer, plan, or status case-insensitively
  return await db
    .select()
    .from(subscriptions)
    .where(
      ilike(subscriptions.customer, `%${query}%`)
        .or(ilike(subscriptions.plan, `%${query}%`))
        .or(ilike(subscriptions.status, `%${query}%`))
    )
    .orderBy(subscriptions.createdAt);
}

export type Subscription = typeof subscriptions.$inferSelect;