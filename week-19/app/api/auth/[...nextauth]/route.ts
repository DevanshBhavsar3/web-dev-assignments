import prisma from "@/app/lib/prismadb";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
