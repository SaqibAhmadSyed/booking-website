import "./globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "University Resource Booking System",
  description: "Web-based resource management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex-grow flex flex-col">
        {children}
      </body>
    </html>
  );
}
