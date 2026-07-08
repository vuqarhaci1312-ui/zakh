import { readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n/language-data";

const LOCALES = new Set<Locale>(["en", "az", "ru", "ar"]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;

  if (!LOCALES.has(locale as Locale)) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", "i18n", `${locale}.json`);
    const body = readFileSync(filePath, "utf8");
    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "Dictionary not found" }, { status: 404 });
  }
}
