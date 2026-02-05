import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const wallop = localFont({
  src: "../public/fonts/Wallop-Regular.otf",
  variable: "--font-wallop",
});
{/*Navnet på hjemmeside, og icon til hjemmeside (Ligger under public)*/}
export const metadata: Metadata = {
  title: "Strømly Lancering 2026",
  description: "Strømly Lancering 2026",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      {}
      <body className={`${wallop.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
