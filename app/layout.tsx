// Root server layout: applies global styles and mounts client-only ErrorReporter.
import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "../components/ErrorReporter";

export const metadata: Metadata = {
  title: "SubscriFlow — SaaS Subscription Management Dashboard",
  description: "SubscriFlow helps support and finance teams manage subscriptions: view, change plans, refund, and cancel—all in one clear dashboard.",
  openGraph: {
    title: "SubscriFlow — SaaS Subscription Dashboard",
    description: "Manage, update, and refund subscriptions effortlessly. Designed for support and finance teams.",
    url: "https://subscriflow.com",
    siteName: "SubscriFlow",
    images: [
      {
        url: "/vercel.svg", // Replace with branded banner if/when available
        width: 1200,
        height: 630,
        alt: "SubscriFlow dashboard hero image"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}