import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db.js";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/" },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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

        if (!email || !password) return null;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser || !existingUser.password) return null;

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) return null;

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          name: existingUser.name || `${existingUser.first_name} ${existingUser.last_name}`,
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
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.student_id = token.student_id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
