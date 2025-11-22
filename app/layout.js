import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./lib/provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "University Resource Booking System",
  description: "Web-based resource management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex-grow flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
