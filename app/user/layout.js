"use client";
import Navbar from "../components/navbar-user";
import Footer from "../components/footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * User layout component - Wrapper for all user pages
 * Features:
 * - User navigation bar
 * - Footer component
 * - Consistent layout structure for user interface
 */
export default function UserLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
