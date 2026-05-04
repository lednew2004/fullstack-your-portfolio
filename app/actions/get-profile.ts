"use server";

import { getUserIdOrRedirect } from "../lib/auth";
import { prisma } from "../lib/prisma";

export async function getProfile() {
  const userId = await getUserIdOrRedirect();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      links: true,
      projects: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export type ProfileData = Awaited<ReturnType<typeof getProfile>>;
