// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface User {
    _id: string;
    token?: string; // if you are storing token too
  }

  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
    jwt?: string;
  }

  interface JWT {
    _id: string;
    email: string;
    name: string;
    jwt?: string;
  }
}
