import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import "./globals.css"

import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";


export const metadata: Metadata = {
  title: "Fashnect - Connect with Fashion Buyers & Sellers",
  description: "Join Fashnect's waitlist - The platform where fashion sellers connect with interested buyers. Be first to experience the future of fashion commerce.",
  generator: 'Next.js',
  applicationName: 'Fashnect',
  referrer: 'origin-when-cross-origin',
  keywords: ['fashion marketplace', 'clothing sellers', 'fashion buyers', 'waitlist', 'fashion platform'],
  authors: [{ name: 'Your Name', url: 'https://fashnect.com' }],
  creator: 'Fashnect',
  publisher: 'Fashnect',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://fashnect.com'), // REPLACE WITH YOUR ACTUAL DOMAIN
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fashnect - Fashion Marketplace Platform',
    description: 'Connecting fashion sellers with interested buyers',
    url: 'https://fashnect.com',
    siteName: 'Fashnect',
    images: [
      {
        url: 'https://fashnect.com/Fashnect.PNG', // REPLACE WITH YOUR OG IMAGE
        width: 1200,
        height: 630,
        alt: 'Fashnect Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashnect - Fashion Marketplace Platform',
    description: 'Connecting fashion sellers with interested buyers',
    images: ['https://fashnect.com/Fashnect.PNG'], // REPLACE WITH YOUR TWITTER IMAGE
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Fashnect",
  "url": "https://fashnect.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://fashnect.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
  <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="Fashnect" />
        <meta name="application-name" content="Fashnect" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="cx1bSzglD8CWkrHDoqGkzdOuDSWqJGlwed4Sih447CM" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={clsx(
          " text-foreground  font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>

        {children}

        </Providers>
      </body>
    </html>
  );
}
