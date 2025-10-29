import Navbar from "../components/navbar-user";
import Footer from "../components/footer";

export default function UserLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}