// src>contexts>use-session.ts

import useSWR, { mutate } from "swr";
import { SessionData, defaultSession } from "./lib";

const sessionApiRoute = "/api/session";
const loginApiRoute = "/api/login";
const logoutApiRoute = "/api/logout"; // New logout API route

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
}

function useSession() {
  const { data: session, error } = useSWR<SessionData>(
    sessionApiRoute,
    fetchJson,
    {
      fallbackData: defaultSession,
    }
  );

  const isLoading = !session && !error;

  async function login(email: string) {
    const updatedSession = await fetchJson<SessionData>(loginApiRoute, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
    mutate(sessionApiRoute, updatedSession, false); // Update the cache with the new session without revalidating
  }

  async function logout() {
    await fetchJson(logoutApiRoute, { method: "POST" }); // Call the logout API route
    mutate(sessionApiRoute, defaultSession, false); // Reset the cache to default session without revalidating
  }

  return { session, isLoading, login, logout };
}

export default useSession;
