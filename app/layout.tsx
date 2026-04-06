import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNavBar, SideNavBar } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Neon Curator | Full Stack Developer",
  description: "Portfolio of a full-stack developer specializing in Next.js, React, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="font-body text-on-surface selection:bg-primary-container selection:text-white overflow-x-hidden relative min-h-screen">
        {/* Background Light Leaks */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="light-leak absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full"></div>
          <div className="light-leak absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 rounded-full"></div>
        </div>
        
        <TopNavBar />
        <SideNavBar />

        {children}
      </body>
    </html>
  );
}
