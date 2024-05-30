import db from "../../../db";
import { hash } from "bcryptjs";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  // Check if the user already exists
  await db.read();
  const existingUser = db.data.users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create new user
  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    emailVerified: null,
  };

  db.data.users.push(newUser);
  await db.write();

  return res.status(201).json({ message: "User registered successfully" });
};
