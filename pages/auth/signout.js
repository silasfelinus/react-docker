import { signOut } from "next-auth/client";
import React from "react";

export default function SignOut() {
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
