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

    // 🔒 SECURITY FIX: CSP Nonce and Headers Generation
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""
        };
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    // Headers set karne ke liye clone banayein
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    // Final optimized next response with headers injection
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Browser enforcement active karne ke liye response par headers lagayein
    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};