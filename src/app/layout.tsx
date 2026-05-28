import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Shine Hair & Beauty | Best Salon in Konnagar",
  description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, beard styling, facials, waxing, beauty treatments, and global hair coloring. Book appointments instantly via WhatsApp.",
  keywords: [
    "The Shine Hair & Beauty",
    "salon in Konnagar",
    "best salon in Konnagar",
    "hair spa Konnagar",
    "beauty parlour Hooghly",
    "unisex salon near me",
    "hair salon in Hooghly",
    "smoothening salon Konnagar"
  ],
  authors: [{ name: "The Shine Hair & Beauty" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://estsalondemo.netlify.app/",
  },
  openGraph: {
    title: "The Shine Hair & Beauty | Best Salon in Konnagar",
    description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, beard styling, facials, waxing, beauty treatments, and global hair coloring. Book appointments instantly via WhatsApp.",
    url: "https://estsalondemo.netlify.app/",
    siteName: "The Shine Hair & Beauty",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://estsalondemo.netlify.app/salon_interior.jpeg",
        width: 1200,
        height: 630,
        alt: "The Shine Hair & Beauty Salon Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shine Hair & Beauty | Best Salon in Konnagar",
    description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, beard styling, facials, waxing, beauty treatments, and global hair coloring. Book appointments instantly via WhatsApp.",
    images: ["https://estsalondemo.netlify.app/salon_interior.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "The Shine Hair & Beauty",
  "image": [
    "https://estsalondemo.netlify.app/salon_interior.jpeg",
    "https://estsalondemo.netlify.app/classic_wave.jpeg",
    "https://estsalondemo.netlify.app/precision_bob.jpeg"
  ],
  "@id": "https://estsalondemo.netlify.app/#salon",
  "url": "https://estsalondemo.netlify.app/",
  "telephone": "+918910276364",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "88/2, Lal Bahadur Sastri Rd, Rammohan Place",
    "addressLocality": "Konnagar, Hooghly",
    "addressRegion": "West Bengal",
    "postalCode": "712235",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7001,
    "longitude": 88.3541
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://wa.me/918910276364"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta name="theme-color" content="#0f0f11" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${workSans.variable} min-h-full flex flex-col bg-transparent text-on-surface font-body-md selection:bg-secondary selection:text-on-secondary`}>
        {children}
      </body>
    </html>
  );
}
