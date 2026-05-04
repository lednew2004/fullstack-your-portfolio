"use server";

import { prisma } from "@/app/lib/prisma"; // ajuste o caminho
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { uploadImage } from "../lib/upload-image";

export async function saveProfile(formData: FormData) {
  try {
    const name = formData.get("yourName") as string;
    const biography = formData.get("yourBiography") as string;
    const role = formData.get("yourRole") as string;
    const file = formData.get("profilePic") as File | null;

    const getCookies = await cookies();
    const token = getCookies.get("token")?.value;

    if (!token) {
      throw new Error("User not authenticated");
    }

    // 🔐 decodifica token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const userId = decoded.userId;

    let imageUrl: string | undefined;

    if (file && file.size > 0) {
      const result = await uploadImage(file);
      imageUrl = result.secure_url;
    }

    // 💾 atualiza usuário
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        biography,
        role,
        ...(imageUrl && { urlImage: imageUrl }),
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
