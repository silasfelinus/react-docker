import { useSession, signIn } from "next-auth/client";
import React from "react";

export default function Dashboard() {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
