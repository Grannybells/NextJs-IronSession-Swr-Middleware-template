import useSession from "@/contexts/use-session";
import { useRouter } from "next/router";
import React from "react";

export default function LogoutButton() {
  const { logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Logout and update session state optimistically
    router.push("/"); // Redirect to home page or login
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center px-2 py-1 uppercase rounded-md border border-red-500"
    >
      Logout
    </button>
  );
}
