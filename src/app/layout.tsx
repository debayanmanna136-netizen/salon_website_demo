import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EST. SALON - Generations of Style",
  description: "Elevating family haircare to high-fashion standards. Generations of style, crafted with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-transparent text-on-surface font-body-md selection:bg-secondary selection:text-on-secondary">
        {children}
      </body>
    </html>
  );
}
