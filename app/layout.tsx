import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Saral Events - Plan Less, Celebrate More",
  description:
    "Your one-stop solution for all event planning needs. Connect with verified vendors, book services instantly, and make your celebrations unforgettable.",
  keywords: "event planning, wedding planning, vendors, catering, photography, decoration, entertainment",
  authors: [{ name: "Saral Events" }],
  creator: "Saral Events",
  publisher: "Saral Events",
  robots: "index, follow",
  openGraph: {
    title: "Saral Events - Plan Less, Celebrate More",
    description:
      "Your one-stop solution for all event planning needs. Connect with verified vendors, book services instantly.",
    url: "https://saralevents.com",
    siteName: "Saral Events",
    images: [
      {
        url: "/images/saral-logo.png",
        width: 1200,
        height: 630,
        alt: "Saral Events Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saral Events - Plan Less, Celebrate More",
    description: "Your one-stop solution for all event planning needs.",
    images: ["/images/saral-logo.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#d97706",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/saral-logo.png" />
        <meta name="theme-color" content="#d97706" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
