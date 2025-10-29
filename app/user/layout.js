import Navbar from "../components/navbar-user";
import Footer from "../components/footer";

/**
 * User layout component - Wrapper for all user pages
 * Features:
 * - User navigation bar
 * - Footer component
 * - Consistent layout structure for user interface
 */
export default function UserLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}