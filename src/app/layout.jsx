import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Care.xyz - Trusted Caregiving Platform",
  description: "আপনার পরিবারের প্রিয়জনদের সুরক্ষায় আমরা আছি সবসময় পাশে।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <NextAuthProvider>
          <header className="container mx-auto">
            <Navbar />
          </header>
          <main className="container mx-auto grow">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}