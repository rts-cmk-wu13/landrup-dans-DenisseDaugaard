import { NextResponse } from "next/server";
import { getJSON } from "@/lib/dal/general";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const url = "http://localhost:4000/api/v1/activities";

  const data = await getJSON(url, { q });

  return NextResponse.json(data);
}