import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { tag?: string };
  revalidateTag(body.tag ?? "translations", "max");

  return NextResponse.json({ revalidated: true, tag: body.tag ?? "translations" });
}
