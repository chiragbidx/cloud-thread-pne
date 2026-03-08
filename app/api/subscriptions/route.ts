import { NextRequest, NextResponse } from "next/server";
import { listSubscriptions } from "../../../lib/db/subscriptions";

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