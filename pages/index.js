import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";

export default function SplashPage() {
  const [session, loading] = useSession();

  return (
    <div
      style={{
        backgroundImage: "url(/splash.jpg)",
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <h1>Welcome to Our App</h1>
      {!loading && !session && (
        <>
          <Link href="/auth/signin">
            <a>Sign In</a>
          </Link>
          <Link href="/auth/register">
            <a>Sign Up</a>
          </Link>
        </>
      )}
      {!loading && session && (
        <Link href="/dashboard">
          <a>Go to Dashboard</a>
        </Link>
      )}
    </div>
  );
}
