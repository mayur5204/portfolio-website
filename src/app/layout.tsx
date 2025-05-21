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
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes neon-glow {
            0%, 100% { text-shadow: 0 0 8px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.5); }
            50% { text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3); }
          }
          
          @keyframes scan-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          
          @keyframes digital-noise {
            0%, 100% { opacity: 0.03; }
            50% { opacity: 0.07; }
          }
          
          .noise-texture {
            position: absolute;
            inset: 0;
            opacity: 0.05;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
            animation: digital-noise 2s infinite;
          }
        ` }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${robotoMono.variable} antialiased bg-slate-950 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
