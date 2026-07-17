import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }
    const segments = pathname.split("/");
    const currentLocale = segments[1];

    const hasLocale = (locales as readonly string[]).includes(currentLocale);
    if (!hasLocale) {
        if (pathname === "/") {
            return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
        }

        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};