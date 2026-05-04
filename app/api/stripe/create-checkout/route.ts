import { getCurrentUser } from "@/app/actions/get-current-user";
import { prisma } from "@/app/lib/prisma";
import stripe from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json();

  const price = isSubscription
    ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    : process.env.STRIPE_PRICE_ID;

  const userSession = await getCurrentUser();

  if (!userSession || !userSession.id || !userSession.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
  }

  const userId = userSession.id;
  const userEmail = userSession.email;
  const userName = userSession.name;

  let customerId = userSession.customerId;

  if (!customerId) {
    const newCostumer = await stripe.customers.create({
      email: userEmail,
      name: userName || "Sem nome",
      metadata: {
        userId: userId,
      },
    });

    customerId = newCostumer.id;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        customerId,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: isSubscription ? "subscription" : "payment",
    payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
    success_url: `${req.headers.get("origin")}/profile`,
    cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
    client_reference_id: userId,
    metadata,
  });

  return NextResponse.json({
    sessionId: session.id,
  });
}
