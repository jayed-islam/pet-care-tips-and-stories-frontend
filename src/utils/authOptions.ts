import GoogleProvider from "next-auth/providers/google";

import axios from "axios";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { paths } from "@/layouts/paths";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser extends NextAuthUser {
  _id: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
        isRegister: {
          label: "Is Register",
          type: "text",
          placeholder: "false",
        },
      },
      async authorize(credentials) {
        const { email, password, isRegister } = credentials as {
          email: string;
          password: string;
          isRegister: string;
        };

        try {
          const url =
            isRegister === "true"
              ? `${process.env.NEXT_API_URL}/auth/register`
              : `${process.env.NEXT_API_URL}/auth/login`;

          const res = await axios.post(url, { email, password });

          const user = res.data;

          console.log("res", res);

          // Check if user exists and is authenticated
          if (user && (res.status === 200 || res.status === 201)) {
            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              token: user.token,
            } as ExtendedUser;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Auth error", error);
          throw new Error(
            isRegister === "true"
              ? "Registration failed"
              : "Invalid credentials"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: paths.auth.login,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   // Custom actions based on provider
    //   if (account?.provider === "google") {
    //     // Handle saving Google user data in DB if necessary
    //     try {
    //       // Post user to your API
    //       const res = await axios.post(
    //         `${process.env.NEXT_API_URL}/google-auth`,
    //         {
    //           name: user.name,
    //           email: user.email,
    //         }
    //       );
    //       return res.status === 200 || res.status === 201 ? true : false;
    //     } catch (err) {
    //       console.error("Google Auth Error", err);
    //       return false;
    //     }
    //   }
    //   return true; // Allow other providers to proceed
    // },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.jwt = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.jwt = token.jwt as string;
      }
      return session;
    },
  },
};
