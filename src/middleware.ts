import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionOptions } from "./contexts/lib";
import { getIronSession } from "iron-session";

async function getUserData(
  request: NextRequest,
  response: NextResponse
): Promise<{ isLoggedIn: boolean; userRole: string | null }> {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );
  return {
    isLoggedIn: !!session.isLoggedIn,
    userRole: session.userRole || null,
  };
}

export async function middleware(request: NextRequest, response: NextResponse) {
  const { isLoggedIn, userRole } = await getUserData(request, response);
  console.log(`This is middleware: ${isLoggedIn}`);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/employee")) {
    return Response.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
