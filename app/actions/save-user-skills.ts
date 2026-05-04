"use server";

import { prisma } from "../lib/prisma";

export async function saveUserSkills(userId: string, skills: string[]) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      skills: {
        set: [],
        connectOrCreate: skills.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });
}
