import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://care-xyz-iota.vercel.app/"),

  title: {
    default: "Care.xyz | Trusted Babysitting & Elderly Care Services",
    template: "%s | Care.xyz",
  },

  description:
    "Care.xyz is a trusted caregiving platform in Bangladesh. Find reliable babysitters, elderly care providers, and sick-person caregivers for your loved ones.",

  applicationName: "Care.xyz",

  keywords: [
    "Care.xyz",
    "Caregiving services Bangladesh",
    "Babysitting services",
    "Baby care Bangladesh",
    "Elderly care services",
    "Elderly caregivers",
    "Patient care services",
    "Trusted caregivers",
    "Home care services Bangladesh",
    "Care booking platform",
  ],

  authors: [{ name: "Care.xyz" }],
  creator: "Care.xyz",
  publisher: "Care.xyz",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "https://i.ibb.co.com/NdcBfdrB/carexyzlogo.png",
      },
    ],
    apple: "https://i.ibb.co.com/NdcBfdrB/carexyzlogo.png",
  },

  openGraph: {
    type: "website",
    locale: "en_BD",
    alternateLocale: ["bn_BD"],
    url: "https://carexyz.vercel.app",
    siteName: "Care.xyz",
    title: "Care.xyz | Trusted Babysitting & Elderly Care Services",
    description:
      "Find trusted babysitters, elderly care providers, and patient caregivers in Bangladesh. Care for your loved ones with confidence.",
    images: [
      {
        url: "https://i.ibb.co.com/0jhNdqB2/carexyzhome.png",
        width: 1200,
        height: 630,
        alt: "Care.xyz - Trusted Caregiving Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.xyz | Trusted Caregiving Platform",
    description:
      "Trusted babysitting, elderly care, and patient care services in Bangladesh.",
    images: ["https://i.ibb.co.com/0jhNdqB2/carexyzhome.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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

          <footer className="container mx-auto">
            <Footer />
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}