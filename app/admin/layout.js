import Navbar from "../components/navbar-admin";
import Footer from "../components/footer";

/**
 * Admin layout component - Wrapper for all admin pages
 * Features:
 * - Admin navigation sidebar
 * - Fixed positioning for consistent layout
 * - Footer component
 * - Left padding to accommodate sidebar
 */
export default function AdminLayout({ children }) {
  return (
    <main className="pl-56 pt-16 min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}