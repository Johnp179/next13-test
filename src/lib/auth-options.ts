import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import envVars from "@/lib/process-env";
const { NEXTAUTH_URL } = envVars;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const resp = await fetch(`${NEXTAUTH_URL}/api/user/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          if (!resp.ok) {
            return null;
          }
          const user = await resp.json();
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub;
      return session;
    },
  },
};
