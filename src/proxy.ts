import { NextRequest, NextResponse } from "next/server";

const BE_BASE_URL = process.env.BE_BASE_URL || "http://localhost:4000/api";
export async function proxy() {
  // Check BE healthcheck endpoint
  const res = await fetch(`${BE_BASE_URL}/healthcheck`);
  if (!res.ok) {
    return NextResponse.json(
      {
        message: "Waking up the service, please wait a moment and try again.",
      },
      {
        status: 503,
      },
    );
  }

  // Continue
  return NextResponse.next();
}
