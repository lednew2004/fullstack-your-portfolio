"use client";

import { useRouter } from "next/navigation";

export default function ClientProfile() {
  const router = useRouter();

  return (
    <button
      className="hover:text-zinc-400 cursor-pointer"
      onClick={() => router.push("/profile")}
    >
      Login
    </button>
  );
}
