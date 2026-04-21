import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Pregnancy Tracker",
  description: "Final project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk-UA">
      <body>{children}</body>
    </html>
  );
}
