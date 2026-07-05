import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    tag?: string;
    paths?: string[];
  };
  const tag = body.tag ?? "translations";
  revalidateTag(tag, "max");

  if (Array.isArray(body.paths)) {
    for (const path of body.paths) {
      if (typeof path === "string" && path.startsWith("/")) {
        revalidatePath(path);
      }
    }
  }

  return NextResponse.json({ revalidated: true, tag, paths: body.paths ?? [] });
}
