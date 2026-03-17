import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("app_refresh_token");
  cookieStore.delete("app_token");
  cookieStore.delete("app_token_exp");
  return NextResponse.json({ ok: true });
}
