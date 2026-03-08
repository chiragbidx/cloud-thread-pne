import { NextRequest, NextResponse } from "next/server";
import { listSubscriptions, createSubscription, updateSubscription } from "../../../lib/db/subscriptions";

// GET /api/subscriptions?search=querystring
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search") ?? undefined;

  try {
    const subs = await listSubscriptions(search);
    return NextResponse.json(subs, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not fetch subscriptions from database" },
      { status: 500 }
    );
  }
}

// POST /api/subscriptions (create new subscription)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await createSubscription(data);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create subscription" },
      { status: 400 }
    );
  }
}

// PATCH /api/subscriptions?id=...
export async function PATCH(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing subscription ID" }, { status: 400 });
  }

  try {
    const updates = await req.json();
    const updated = await updateSubscription(id, updates);
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update subscription" },
      { status: 400 }
    );
  }
}