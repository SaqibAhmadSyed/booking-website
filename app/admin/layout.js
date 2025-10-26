import Navbar from "../components/navbar-admin";
import Footer from "../components/footer";

export default function AdminLayout({ children }) {
  return (
    <main className="pl-56 pt-16 min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}