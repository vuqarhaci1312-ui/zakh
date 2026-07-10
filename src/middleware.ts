import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/seo/site-config";
import { getLocaleFromPathname, stripLocale } from "@/lib/i18n/locale-path";

const ADMIN_PROTECTED = [
  "/admin/dashboard",
  "/admin/catalogs",
  "/admin/tours",
  "/admin/reservations",
  "/admin/social-media",
  "/admin/events",
  "/admin/certificates",
  "/admin/languages",
];

const PUBLIC_FILE = /\.[a-zA-Z0-9]+$/;

function isSkippedPath(pathname: string) {
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/favicon.ico" ||
    pathname === "/llms.txt" ||
    pathname === "/humans.txt"
  ) {
    return true;
  }
  return PUBLIC_FILE.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace(/^www\./, "");
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith("/admin")) {
    const response = handleAdmin(request);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (isSkippedPath(pathname)) {
    return NextResponse.next();
  }

  const localeInPath = getLocaleFromPathname(pathname);

  if (!localeInPath) {
    const cookieLocale = request.cookies.get("zakher-locale")?.value;
    const preferred =
      cookieLocale && isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
    const url = request.nextUrl.clone();
    const bare = stripLocale(pathname);
    url.pathname = bare === "/" ? `/${preferred}` : `/${preferred}${bare}`;
    return NextResponse.redirect(url, 308);
  }

  if (pathname === `/${localeInPath}/destinations`) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localeInPath}/tour-packages`;
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", localeInPath);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set("zakher-locale", localeInPath, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  if (request.nextUrl.searchParams.get("edit") === "1") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

function handleAdmin(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = ADMIN_PROTECTED.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
