import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import AIChat from "@/components/chat/AIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NatureStay | Immersive Homestay Experience",
  description: "Experience the harmony of nature and comfort at NatureStay. Book your peaceful sanctuary in the heart of the forest via WhatsApp.",
  keywords: ["homestay", "nature stay", "forest cabin", "eco-friendly travel", "North Bengal tourism", "mountain villa"],
  openGraph: {
    title: "NatureStay | Immersive Homestay Experience",
    description: "Book your peaceful sanctuary in the heart of the forest.",
    images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <AIChat />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
