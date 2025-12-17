import type { Metadata, Viewport } from "next";
import { Kumbh_Sans, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

// Primary font for body text
const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kumbh-sans",
});

// Accent font for headings (Web3-inspired)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "MyDictionary | Modern Word Learning Platform",
    template: "%s | MyDictionary",
  },
  description: "Discover, learn, and master new words with MyDictionary - a modern, intelligent dictionary application powered by cutting-edge technology.",
  keywords: ["dictionary", "vocabulary", "learning", "words", "definitions", "language"],
  authors: [{ name: "MyDictionary Team" }],
  creator: "MyDictionary",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mydictionary.com",
    title: "MyDictionary | Modern Word Learning Platform",
    description: "Discover, learn, and master new words with MyDictionary",
    siteName: "MyDictionary",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyDictionary | Modern Word Learning Platform",
    description: "Discover, learn, and master new words with MyDictionary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${kumbhSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {/* Animated gradient background */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-transparent blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
          </div>

          {/* Main layout structure */}
          <div className="relative flex min-h-screen flex-col">
            {/* Navigation with backdrop blur */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
              <Navigation />
            </header>

            {/* Main content area */}
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                {children}
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Grain texture overlay for Web3 aesthetic */}
          <div 
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]" 
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
