import { getIronSession } from "iron-session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { SessionData, sessionOptions } from "@/contexts/lib";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSession from "@/contexts/use-session";
import Head from "next/head";
import LogoutButton from "@/components/logoutButton";

export default function Employee({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex w-screen min-h-screen font-poppins overflow-hidden">
      <Head>
        <title>Dashboard - {session.email}</title>
      </Head>
      <Content session={session} />
    </main>
  );
}

export const getServerSideProps = (async (context) => {
  const session = await getIronSession<SessionData>(
    context.req,
    context.res,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}) satisfies GetServerSideProps<{
  session: SessionData;
}>;

function Content({ session }: { session: SessionData }) {
  const { isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session.isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, session.isLoggedIn, router]);

  return (
    <div className="flex flex-col">
      <h1>This is employee</h1>
      {session.email}
      <LogoutButton />
    </div>
  );
}
