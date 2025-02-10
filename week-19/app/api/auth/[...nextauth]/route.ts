import prisma from "@/app/lib/prismadb";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentails",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const result = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (result && result.password === password) {
          return result;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
