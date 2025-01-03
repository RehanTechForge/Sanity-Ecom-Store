import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SanityLive } from "@/sanity/lib/live";
import ClientLayout from "./clientLayout";

const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "400 900",
});

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash-display",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "Ecomm24 - Hackathon E-commerce Project",
  description:
    "A sleek and modern e-commerce UI/UX design developed within 24 hours for a hackathon. Built with a focus on user experience, speed, and design excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${satoshi.variable} ${clashDisplay.variable} antialiased`}
        >
          <ClientLayout>
            <main className="max-w-[1440px] mx-auto">
              <Header />
              {children}
              <Footer />
            </main>
          </ClientLayout>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
