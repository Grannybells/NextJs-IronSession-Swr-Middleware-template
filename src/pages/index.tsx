import useSession from "@/contexts/use-session";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";

export default function Index() {
  const { session, login } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.isLoggedIn) {
      router.replace("/employee");
    }
  }, [session?.isLoggedIn, router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    login(email);
  };
  return (
    <main>
      <form onSubmit={handleLogin} method="POST">
        <div>Login</div>
        <label>
          <span>Username</span>
          <input type="text" name="email" placeholder="Enter Email" />
        </label>

        {/* <label>
          <span>Password</span>
          <input type="text" name="email" placeholder="Enter Password" />
        </label> */}
        <button type="submit" value="Login">
          Login
        </button>
      </form>
    </main>
  );
}
