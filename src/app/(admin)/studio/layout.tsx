import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const satoshi = localFont({
  src: "../../fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "400 900",
});

const clashDisplay = localFont({
  src: "../../fonts/ClashDisplay-Variable.ttf",
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
    <html lang="en">
      <body
        className={`${satoshi.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
