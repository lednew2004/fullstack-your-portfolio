"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("Missing fields");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password_hash) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  // 🔐 cria token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // 🍪 salva cookie
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
}
