import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Sports",
  description: "True Sports - Your gateway to unparalleled sports content, audience engagement, and brand growth.",
  keywords: ["sports", "True Sports", "brand engagement", "sports content", "sports marketing"],
  authors: [{ name: "True Sports" }],
  themeColor: "#1E40AF", // blue theme
  openGraph: {
    title: "True Sports",
    description: "True Sports - Your gateway to unparalleled sports content, audience engagement, and brand growth.",
    url: "https://truesports.vercel.app",
    siteName: "True Sports",
    images: [
      {
        url: "/meta-logo-1.png",
        width: 512,
        height: 512,
        alt: "True Sports Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "True Sports",
    description: "True Sports - Your gateway to unparalleled sports content, audience engagement, and brand growth.",
    images: ["/meta-logo-1.png"],
    creator: "@TrueSports", // optional: Twitter handle
  },
  icons: {
    icon: "/meta-logo-1.png",
    shortcut: "/meta-logo-1.png",
    apple: "/meta-logo-1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
