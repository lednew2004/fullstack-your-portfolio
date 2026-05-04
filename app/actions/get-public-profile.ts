"use server";

import { prisma } from "../lib/prisma";

export async function getPublicProfile(slug: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: slug,
    },
    include: {
      skills: true,
      links: true,
      projects: {
        include: {
          techs: true, // se você usa relação
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
