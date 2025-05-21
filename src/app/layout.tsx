import type { Metadata } from "next";
import { Space_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayur Patil | AI & ML Engineer",
  description: "Portfolio website of Mayur Machhindra Patil, a 3rd-year AI & ML engineering student showcasing projects and skills in artificial intelligence and machine learning.",
  keywords: ["AI", "ML", "Machine Learning", "Portfolio", "Developer", "Engineering", "3D", "Three.js"],
  authors: [{ name: "Mayur Patil" }],
  creator: "Mayur Machhindra Patil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${robotoMono.variable} antialiased bg-slate-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
