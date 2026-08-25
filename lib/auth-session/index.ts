// lib/auth-session.ts
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session; // null if no active session
}

export async function getUserId() {
  const session = await getSession();
  return session?.user?.id ?? null;
}

export async function requireUserId() {
  const userId = await getUserId();
  if (!userId) throw new Error("UNAUTHORIZED");
  return userId;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return session;
}