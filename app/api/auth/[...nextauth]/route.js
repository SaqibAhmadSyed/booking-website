import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth.js";

// Initialize NextAuth with the defined options which is handled in lib/auth.js
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };