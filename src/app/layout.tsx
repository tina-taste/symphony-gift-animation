import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const azeret = Azeret_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
});

const matter = localFont({
  src: [
    { path: "../fonts/Matter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Matter-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-matter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://animation-images-eight.vercel.app"),
  title: "Symphony Design Bench",
  description: "Prototype animations",
  openGraph: {
    title: "Symphony Design Bench",
    description: "Prototype animations",
    siteName: "Symphony Design Bench",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symphony Design Bench",
    description: "Prototype animations",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${matter.variable} ${azeret.variable}`}>
      <body>{children}</body>
    </html>
  );
}
