import { getProfile } from "@/app/actions/get-profile";
import { PricingPlans } from "@/app/components/pricing-plans";

export default async function UpgradePage() {
  const profileData = await getProfile();
  return <PricingPlans profileId={profileData.id} />;
}
