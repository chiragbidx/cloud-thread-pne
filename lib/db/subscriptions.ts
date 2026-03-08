import { db } from "./client";
import { subscriptions } from "./schema";
import { eq, ilike, and } from "drizzle-orm";

export type Subscription = typeof subscriptions.$inferSelect;

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

/**
 * Create a new subscription record
 * @param subscription - subscription data (customer, email, plan, status, price, nextRenewal)
 * @returns inserted record
 */
export async function createSubscription(subscription: {
  customer: string;
  email: string;
  plan: string;
  status: string;
  price: number;
  nextRenewal: string;
}) {
  // Validation: minimal for demo
  if (
    !subscription.customer ||
    !subscription.email ||
    !subscription.plan ||
    !subscription.status ||
    typeof subscription.price !== "number" ||
    !subscription.nextRenewal
  ) {
    throw new Error("All fields are required.");
  }

  // Prevent duplicate by email+plan (not status) - match on normalized lowercase email and plan
  const exists = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.email, subscription.email.trim().toLowerCase()),
        eq(subscriptions.plan, subscription.plan.trim().toLowerCase())
      )
    );
  if (exists.length > 0) throw new Error("A subscription for this user and plan already exists.");

  try {
    const [inserted] = await db
      .insert(subscriptions)
      .values({
        ...subscription,
        email: subscription.email.trim().toLowerCase(),
        plan: subscription.plan.trim().toLowerCase(),
      })
      .returning();

    return inserted;
  } catch (err: any) {
    throw new Error(
      err?.message && typeof err.message === "string"
        ? `Database error: ${err.message}`
        : "Failed to create subscription. Please check input data."
    );
  }
}

/**
 * Update an existing subscription record by ID
 * @param id - subscription id
 * @param updates - partial update; same shape as create
 * @returns updated record
 */
export async function updateSubscription(
  id: string,
  updates: {
    customer?: string;
    email?: string;
    plan?: string;
    status?: string;
    price?: number;
    nextRenewal?: string;
  }
) {
  if (!id) throw new Error("Subscription ID required.");
  try {
    const normUpdates = { ...updates };
    if (normUpdates.email) normUpdates.email = normUpdates.email.trim().toLowerCase();
    if (normUpdates.plan) normUpdates.plan = normUpdates.plan.trim().toLowerCase();

    const [updated] = await db
      .update(subscriptions)
      .set(normUpdates)
      .where(eq(subscriptions.id, id))
      .returning();
    if (!updated) throw new Error("Subscription not found.");
    return updated;
  } catch (err: any) {
    throw new Error(
      err?.message && typeof err.message === "string"
        ? `Database error: ${err.message}`
        : "Failed to update subscription. Please check input data."
    );
  }
}