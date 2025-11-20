"use client";
import Navbar from "../components/navbar-admin";
import Footer from "../components/footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Admin layout component - Wrapper for all admin pages
 * Features:
 * - Admin navigation sidebar
 * - Fixed positioning for consistent layout
 * - Footer component
 * - Left padding to accommodate sidebar
 */

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Not logged in at all → go to login
      router.push("/");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      // Logged in but not admin → go to user page
      router.push("/user");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }
  return (
    <main className="pl-56 pt-16 min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
