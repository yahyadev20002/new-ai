import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereal Shapes - Immersive Scroll-Triggered Animations",
  description: "Experience the magic of morphing geometric forms that dance and transform as you scroll through this immersive journey.",
  keywords: ["Ethereal Shapes", "Scroll Animation", "GSAP", "React", "Interactive", "Web Design", "Animation"],
  authors: [{ name: "Yahya Loulou/SetAlkel" }],
  openGraph: {
    title: "Ethereal Shapes",
    description: "Immersive scroll-triggered animated website experience",
    url: "https://ethereal-shapes.com",
    siteName: "Ethereal Shapes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethereal Shapes",
    description: "Immersive scroll-triggered animated website experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
