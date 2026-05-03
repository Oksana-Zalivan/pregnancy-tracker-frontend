import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Leleka",
  description: "Pregnancy tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${comfortaa.variable} ${lato.variable}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
