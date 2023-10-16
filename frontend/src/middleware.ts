import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function serializeCookie<const T extends RequestCookie>(
  cookie: T,
): `${T["name"]}=${T["value"]}` {
  return `${cookie.name}=${cookie.value}`;
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    const sessionId = request.cookies.get("sessionId");
		console.log("sessionID present", !!sessionId)
    if (!sessionId) return;

    const userActive = await fetch("http://localhost:3001/users/me", {
      credentials: "include",
      headers: {
        Cookie: serializeCookie(sessionId),
      },
    });

    if (userActive.ok) return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    try {
      const sessionId = request.cookies.get("sessionId");

      if (!sessionId) console.log("/, no sessionId -> redirect to /login");
      if (!sessionId)
        return NextResponse.redirect(new URL("/login", request.url));

      const userActive = await fetch("http://localhost:3001/users/me", {
        credentials: "include",
        headers: {
          Cookie: serializeCookie(sessionId),
        },
      });

      if (!userActive.ok)
        console.log("/, !userActive.ok -> redirect to /login");
      if (!userActive.ok)
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

// export function middleware() {}
