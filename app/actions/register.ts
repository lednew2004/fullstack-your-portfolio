"use server";

import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export async function registerUser({
  name,
  username,
  email,
  password,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  if (!name || !username || !email || !password) {
    throw new Error("Missing fields");
  }

  // verifica email
  const emailExists = await prisma.user.findUnique({
    where: { email },
  });

  if (emailExists) {
    throw new Error("Email already in use");
  }

  // verifica username
  const usernameExists = await prisma.user.findUnique({
    where: { username },
  });

  if (usernameExists) {
    throw new Error("Username already in use");
  }

  const password_hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      username,
      email,
      password_hash,
    },
  });

  return { success: true };
}
