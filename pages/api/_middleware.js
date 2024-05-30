import { getSession } from "next-auth/client";

export default async function middleware(req, res, next) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  next();
}
