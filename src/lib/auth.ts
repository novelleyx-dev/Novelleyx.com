import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@novelleyx.com") {
          return { id: "1", name: "Admin", email: "admin@novelleyx.com", role: "FOUNDER" };
        }
        if (credentials?.email === "client@test.com") {
          return { id: "2", name: "Client", email: "client@test.com", role: "CLIENT" };
        }

        if (credentials?.email) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (user) {
            return {
              id: user.id,
              name: user.name || "User",
              email: user.email,
              role: user.role,
            };
          }
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
