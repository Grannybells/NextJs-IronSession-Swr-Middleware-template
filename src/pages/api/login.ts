// /pages/api/login.js
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/contexts/lib";

export default async function loginHandler(
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

  const { email } = request.body;

  session.isLoggedIn = true;
  session.email = email;

  await session.save();
  return response.json(session);
}
