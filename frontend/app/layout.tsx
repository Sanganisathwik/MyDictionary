import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kumbh-sans",
});

export const metadata: Metadata = {
  title: "MyDictionary",
  description: "A simple dictionary application for managing words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kumbhSans.variable}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}