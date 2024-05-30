import { signIn } from "next-auth/client";
import React from "react";

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn("email")}>Sign in with Email</button>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
