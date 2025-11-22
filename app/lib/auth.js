// lib/auth.js
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db.js";

export const authOptions = {
  adapter: PrismaAdapter(db),
  pages: { signIn: "/" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    Credentials({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email.trim() },
          select: { id: true, email: true, name: true, password: true, role: true, image: true, student_id: true },
        });
        if (!user || !user.password) return null;

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return {
          id: typeof user.id === "bigint" ? user.id.toString() : String(user.id),
          email: user.email,
          name: user.name ?? null,
          role: user.role ?? null,
          image: user.image ?? null,
          student_id: user.student_id != null ? String(user.student_id) : null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name ?? null;
        token.role = user.role ?? null;
        token.image = user.image ?? null;
        token.student_id = user.student_id ?? null;
      }

      // Update session
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.email = session.user.email ?? token.email;
        token.image = session.user.image ?? token.image;
        token.role = session.user.role ?? token.role;
        token.student_id = session.user.student_id ?? token.student_id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        image: token.image,
        student_id: token.student_id,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
