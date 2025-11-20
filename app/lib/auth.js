// lib/auth.js
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db.js";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt", // Use JWT strategy for sessions (encrypted in cookies)
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email?.trim();
        const password = credentials?.password;
        if (!email || !password) {
          console.log("Missing email or password");
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        console.log("existingUser found:", existingUser ? { id: existingUser.id, email: existingUser.email, hasPassword: !!existingUser.password } : null);

        if (!existingUser || !existingUser.password) return null;

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        console.log("passwordMatch:", passwordMatch);
        if (!passwordMatch) return null;

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          name:
            existingUser.name ||
            `${existingUser.first_name} ${existingUser.last_name}`,
          role: existingUser.role,
          student_id: existingUser.student_id?.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.student_id = user.student_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.student_id = token.student_id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};