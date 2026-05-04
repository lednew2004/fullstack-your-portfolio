"use server";

import { getUserIdOrRedirect } from "../lib/auth";
import { prisma } from "../lib/prisma";

export default async function createSocialLinks({
  github,
  instagram,
  linkedin,
  twitter,
}: {
  github?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}) {
  try {
    const userId = await getUserIdOrRedirect();

    const links = [
      github && { type: "GITHUB", url: github },
      instagram && { type: "INSTAGRAM", url: instagram },
      linkedin && { type: "LINKEDIN", url: linkedin },
      twitter && { type: "TWITTER", url: twitter },
    ].filter(Boolean) as { type: string; url: string }[];

    for (const link of links) {
      await prisma.links.upsert({
        where: {
          userid_type: {
            userid: userId,
            type: link.type as any,
          },
        },
        update: {
          url: link.url,
        },
        create: {
          userid: userId,
          type: link.type as any,
          url: link.url,
        },
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
