import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserIdOrRedirect() {
  const cookiesGet = await cookies();
  const token = cookiesGet.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return (decoded as any).userId;
  } catch {
    redirect("/login");
  }
}
