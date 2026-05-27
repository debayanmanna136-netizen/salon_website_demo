import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Shine Hair & Beauty | Best Salon in Konnagar",
  description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, facials, global coloring, beard styling, and beauty services. Book appointments via WhatsApp.",
  keywords: [
    "The Shine Hair & Beauty",
    "salon in Konnagar",
    "best salon in Konnagar",
    "unisex salon Hooghly",
    "hair spa Konnagar",
    "beauty parlour near me"
  ],
  alternates: {
    canonical: "https://theshinehairandbeauty.com",
  },
  openGraph: {
    title: "The Shine Hair & Beauty | Best Salon in Konnagar",
    description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, facials, global coloring, beard styling, and beauty services.",
    url: "https://theshinehairandbeauty.com",
    siteName: "The Shine Hair & Beauty",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://theshinehairandbeauty.com/salon_interior.jpeg",
        width: 1200,
        height: 630,
        alt: "The Shine Hair & Beauty Salon Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shine Hair & Beauty | Best Salon in Konnagar",
    description: "Premium unisex salon in Konnagar offering haircuts, hair spa, smoothening, facials, global coloring, beard styling, and beauty services.",
    images: ["https://theshinehairandbeauty.com/salon_interior.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "The Shine Hair & Beauty",
  "image": [
    "https://theshinehairandbeauty.com/salon_interior.jpeg"
  ],
  "@id": "https://theshinehairandbeauty.com/#salon",
  "url": "https://theshinehairandbeauty.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-transparent text-on-surface font-body-md selection:bg-secondary selection:text-on-secondary">
        {children}
      </body>
    </html>
  );
}
