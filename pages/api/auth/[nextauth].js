import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../../../db";

// Define custom database adapter for LowDB
const LowDBAdapter = {
  async getUser(id) {
    await db.read();
    return db.data.users.find((user) => user.id === id);
  },
  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },
  async getUserByAccount({ providerAccountId, provider }) {
    await db.read();
    const account = db.data.accounts.find(
      (acc) =>
        acc.providerAccountId === providerAccountId &&
        acc.provider === provider,
    );
    if (account) {
      return db.data.users.find((user) => user.id === account.userId);
    }
    return null;
  },
  async createUser(user) {
    await db.read();
    user.id = `${Date.now()}`; // Simple ID generation
    db.data.users.push(user);
    await db.write();
    return user;
  },
  async linkAccount(account) {
    await db.read();
    db.data.accounts.push(account);
    await db.write();
    return account;
  },
  async createSession(session) {
    await db.read();
    session.id = `${Date.now()}`; // Simple ID generation
    db.data.sessions.push(session);
    await db.write();
    return session;
  },
  async getSessionAndUser(sessionToken) {
    await db.read();
    const session = db.data.sessions.find(
      (sess) => sess.sessionToken === sessionToken,
    );
    if (session) {
      const user = db.data.users.find((user) => user.id === session.userId);
      return { session, user };
    }
    return null;
  },
  async updateSession(session) {
    await db.read();
    const index = db.data.sessions.findIndex((sess) => sess.id === session.id);
    if (index !== -1) {
      db.data.sessions[index] = session;
      await db.write();
    }
    return session;
  },
  async deleteSession(sessionToken) {
    await db.read();
    db.data.sessions = db.data.sessions.filter(
      (sess) => sess.sessionToken !== sessionToken,
    );
    await db.write();
  },
};

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: LowDBAdapter,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/register",
  },
  secret: process.env.SECRET,
});
