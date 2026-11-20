import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "plaedoes-place-in-the-market",
    timestamp: new Date().toISOString(),
  });
}
