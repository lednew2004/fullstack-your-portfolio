"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return { error: "Dados não preenchidos" };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password_hash) {
    return { error: "Credenciais invalidas" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    return { error: "Credenciais invalidas" };
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

  redirect("/profile");
}
