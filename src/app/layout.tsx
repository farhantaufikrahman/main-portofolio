import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Jersey_10, Sora } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

// Pixel display face for headings and numbers (clear digits); Sora keeps paragraphs easy to read.
const display = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name}, ${profile.role}`,
  description: `${profile.headline} Featured: Llama Express, a real-time courier platform on Spring Boot, Kafka and Kubernetes.`,
  openGraph: {
    title: `${profile.name}, ${profile.role}`,
    description: profile.headline,
    images: ["/projects/llama/customer-tracking.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050817" },
    { media: "(prefers-color-scheme: dark)", color: "#050817" },
  ],
};

// Runs before paint: applies the saved theme so the page never flashes. Night ("dark") is the default.
const themeScript = `(function(){var t="dark";try{var s=localStorage.getItem("theme");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.dataset.theme=t})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
