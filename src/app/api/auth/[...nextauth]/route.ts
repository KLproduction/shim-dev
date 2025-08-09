import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth route GET handler" });
}

export async function POST() {
  return NextResponse.json({ message: "Auth route POST handler" });
}
