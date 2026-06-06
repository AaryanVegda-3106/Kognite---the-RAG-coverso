import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Kognite | Searchable Intelligence",
  description: "Turn Any Source Into Searchable Intelligence with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-inter relative min-h-screen`}>
          <AmbientBackground />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
