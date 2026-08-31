import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNotice from "@/components/Mobile.Notice";

export const metadata: Metadata = {
  title: "Vishal Gunra",
  description: "Portfolio, blog, and a bit about me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileNotice />
      </body>
    </html>
  );
}