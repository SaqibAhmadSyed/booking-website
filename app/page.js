import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-amber-200 min-h-screen text-black font-bold  ">
      <Link href="/admin/dashboard" className="px-3 py-2 text-sm text-black rounded-lg m-1">admin dashboard</Link>
    </main>
  );
}
                