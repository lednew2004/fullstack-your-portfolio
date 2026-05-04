import { getCurrentUser } from "@/app/actions/get-current-user";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getCurrentUser();
  const userId = session?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerId = session.customerId;

  if (!customerId) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get("origin")}/u/${session.username}`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
