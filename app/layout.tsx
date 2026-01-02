import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import QueryProvider from "./providers/QueryProvider";
import type { Metadata } from "next";
// import "antd/dist/reset.css";
// import { Analytics } from "@vercel/analytics/next";
const inter = Inter({ subsets: ["latin"] });
// import logo from "@/public/images/shopcare_logo.jpg";
export const metadata: Metadata = {
  metadataBase: new URL("https://shopcare.soulsoftsks.in"), // Update with actual production URL
  title: "K-Bazaar Billing Software",
  description:
    "Shopcare Billing Software helps hardware stores and retail businesses manage billing, inventory, GST invoices, sales, purchases, and stock with speed, accuracy, and ease.",

  generator: "Soulsoft Infotek Pvt. Ltd.",
  keywords: [
    "Shopcare Billing Software",
    "Shopcare ERP",
    "billing software for shops",
    "GST billing software",
    "inventory management software",
    "POS billing system",
    "retail billing software",
    "hardware shop billing software",
    "hardware store management software",
    "sales and purchase management",
    "stock and inventory tracking",
    "wholesale billing software",
    "small business billing software",
    "business management software",
    "invoice and billing system",
    "store inventory ERP",
    "supplier and purchase order management",
    "customer billing system",
    "Shopcare invoice software",
    "Soulsoft Infotek",
  ],

  alternates: {
    canonical: "https://shopcarebilling.com",
    languages: {
      "en-US": "https://shopcarebilling.com/en",
      "mr-IN": "https://shopcarebilling.com/mr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Shopcare Billing Software – Hardware Inventory & Billing Software",
    description:
      "Powerful ERP software designed for stores, wholesalers and distributors. Manage stock, sales, purchase orders, suppliers and GST billing with accuracy and speed.",
    url: "https://shopcarebilling.com/",
    siteName: "Shopcare Billing Software ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "shopcare_logo.jpg",
        width: 800,
        height: 600,
        alt: "Shopcare Billing Software Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulConnect ERP – Inventory & Hardware Billing Software",
    description:
      "Manage stock, billing, purchases & distribution with precision. Powered by Soulsoft Infotek Pvt. Ltd.",
    site: "@SoulsoftInfotek",
    creator: "@SoulsoftInfotek",
  },
  icons: {
    icon: "/favicon2.png",
    shortcut: "/images/shopcare_logo.jpg",
    apple: "/images/shopcare_logo.jpg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} overflow-x-hidden`}>
      <body className="overflow-x-hidden max-w-full">
        <QueryProvider>{children}</QueryProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title:
//     "SoulConnect ERP – Modern Inventory, Billing & Hardware Management Software",
//   description:
//     "Transform your hardware business with SoulConnect ERP. Manage inventory, purchasing, sales, billing, suppliers, and reports with precision. Built for hardware retailers, wholesalers & distributors. Fast, modern & intuitive ERP.",
//   generator: "Soulsoft Infotek Pvt. Ltd.",
//   keywords: [
//     "SoulConnect ERP",
//     "hardware shop software",
//     "hardware billing software",
//     "inventory management software",
//     "purchase and sales ERP",
//     "hardware store ERP",
//     "wholesale hardware ERP",
//     "stock management system",
//     "GST billing software",
//     "retail POS for hardware",
//     "hardware business management software",
//     "Soulsoft Infotek",
//     "ERP for hardware distributors",
//     "purchase order management",
//     "supplier management ERP",
//     "warehouse inventory software",
//     "small business ERP",
//   ],
//   alternates: {
//     canonical: "https://soulagronexus.com",
//     languages: {
//       "en-US": "https://soulagronexus.com/en",
//       "mr-IN": "https://soulagronexus.com/mr",
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },
//   openGraph: {
//     title: "SoulConnect ERP – Hardware Inventory & Billing Software",
//     description:
//       "Powerful ERP software designed for stores, wholesalers and distributors. Manage stock, sales, purchase orders, suppliers and GST billing with accuracy and speed.",
//     url: "https://soulagronexus.com/",
//     siteName: "SoulConnect ERP",
//     locale: "en_US",
//     type: "website",
//     images: [
//       {
//         url: "/images/logo.png",
//         width: 800,
//         height: 600,
//         alt: "SoulConnect ERP Logo",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "SoulConnect ERP – Inventory & Hardware Billing Software",
//     description:
//       "Manage stock, billing, purchases & distribution with precision. Powered by Soulsoft Infotek Pvt. Ltd.",
//     site: "@SoulsoftInfotek",
//     creator: "@SoulsoftInfotek",
//   },
//   icons: {
//     icon: "/images/Favicon.png",
//     shortcut: "/images/soulconnect.png",
//     apple: "/images/soulconnect.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   );
// }
