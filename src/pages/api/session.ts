// /pages/api/session.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "@/contexts/lib";

export default async function sessionHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  if (request.method === "GET") {
    if (session.isLoggedIn !== true) {
      return response.json(defaultSession);
    }
    return response.json(session);
  }

  return response.status(405).end(`Method ${request.method} Not Allowed`);
}
