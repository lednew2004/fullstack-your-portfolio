"use client";

import { useStripe } from "../hooks/use-stripe";

export default function Portalbutton() {
  const { handleCreateStripePortal } = useStripe();

  return (
    <button className="cursor-pointer" onClick={handleCreateStripePortal}>
      Portal
    </button>
  );
}
