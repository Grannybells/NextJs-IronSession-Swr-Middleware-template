// /pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "@/contexts/lib";

export default async function logoutHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  if (session.isLoggedIn !== true) {
    return response.status(401).end("Unauthorized");
  }

  await session.destroy();
  return response.json(defaultSession);
}
