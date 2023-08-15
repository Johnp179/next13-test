"use client";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <button onClick={() => router.refresh()}>Refresh</button>
    </main>
  );
}
