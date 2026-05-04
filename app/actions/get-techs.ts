"use server";

import { prisma } from "../lib/prisma";

export async function getTechs() {
  const techs = await prisma.techs.findMany();

  return techs;
}
