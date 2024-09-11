import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft | Pet daycare software",
  description: "Take care of people's pets responsibly with PetSoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm min-h-screen text-zinc-900 bg-[#E5E8EC]`}>
        {children}
      </body>
    </html>
  );
}
