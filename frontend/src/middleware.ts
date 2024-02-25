import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function serializeCookie<const T extends RequestCookie>(
  cookie: T,
): `${T["name"]}=${T["value"]}` {
  return `${cookie.name}=${cookie.value}`;
}

const API_ADDRESS =
  process.env.NODE_ENV_SUBTYPE === "docker"
    ? process.env.API_ADDRESS
    : process.env.NEXT_PUBLIC_API_ADDRESS;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    const sessionId = request.cookies.get("sessionId");
    if (!sessionId) return;

    try {
      const response = await fetch(`http://${API_ADDRESS}/users/me`, {
        credentials: "include",
        headers: {
          Cookie: serializeCookie(sessionId),
        },
      });

      if (response.ok) return NextResponse.redirect(new URL("/", request.url));
    } catch (e) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/") {
    const sessionId = request.cookies.get("sessionId");

    if (!sessionId)
      return NextResponse.redirect(new URL("/login", request.url));

    try {
      const response = await fetch(`http://${API_ADDRESS}/users/me`, {
        credentials: "include",
        headers: {
          Cookie: serializeCookie(sessionId),
        },
      });

      if (!response.ok)
        return NextResponse.redirect(new URL("/login", request.url));
    } catch (e) {
      console.error(`Middleware error: ${e}`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login"],
};
