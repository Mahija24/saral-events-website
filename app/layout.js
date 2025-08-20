import "./globals.css";

export const metadata = {
  title: "Saral Events - Plan Less, Celebrate More",
  description:
    "Your one-stop solution for all event planning needs. Connect with verified vendors, book services instantly, and make your celebrations unforgettable.",
  keywords:
    "event planning, wedding planning, vendors, catering, photography, decoration, entertainment, birthday planning, corporate events, engagement planning, anniversary parties, destination weddings, bridal makeup, mehendi artists, music bands, DJs, sound system rental, event venues, banquet halls, party halls, decorators, flower decoration, event organizers, wedding photography, candid photography, videography, lights and sound, event management services, conference planning, seminar planning, festival planning, family functions, event packages, budget-friendly events, luxury wedding planning",
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
        url: "https://saralevents.com/logo.png", // ✅ Absolute URL (important for Google)
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
    images: ["https://saralevents.com/logo.png"], // ✅ absolute URL
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#d97706",
  generator: "Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon & Apple icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ✅ Web App support */}
        <meta name="theme-color" content="#d97706" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* ✅ Schema.org (Organization with logo) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Saral Events",
              url: "https://saralevents.com",
              logo: "https://saralevents.com/logo.png",
              sameAs: [
                "https://facebook.com/saralevents",
                "https://www.instagram.com/saral_events_?igsh=dnBxcTVkZmZmbjly",
                "https://www.linkedin.com/company/yourpage",
                "https://twitter.com/saraleventshttps://www.linkedin.com/company/nexus-eventers/"
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
