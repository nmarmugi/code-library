import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Library",
  description: "Una collezione curata di snippet di codice, funzioni utili e soluzioni pronte all'uso. Salva, organizza e condividi i tuoi frammenti di codice preferiti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
