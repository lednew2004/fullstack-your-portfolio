const TRIAL_DAYS = 3;

export function isTrialActive(user: { createdAt: Date }) {
  const now = new Date();
  const createdAt = new Date(user.createdAt);

  const diff = now.getTime() - createdAt.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  return days <= TRIAL_DAYS;
}

export function hasAccess(user: { isVip: boolean; createdAt: Date }) {
  if (user.isVip) return true;

  return isTrialActive(user);
}
