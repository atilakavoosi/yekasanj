import type { Metadata } from "next";
import { Vazirmatn, JetBrains_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://yekasanj.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "یکاسنج | مبدل آنی یکاهای فیزیک",
  description: "یکاسنج، مبدل سریع و آنلاین یکاهای فیزیک برای دانش‌آموزان و دانشجویان؛ تبدیل طول، جرم، زمان، دما، نیرو، انرژی، فشار، توان و ده‌ها کمیت دیگر در یک ثانیه.",
  keywords: ["تبدیل یکا", "مبدل واحد فیزیک", "تبدیل واحد", "یکاسنج", "physics unit converter", "unit converter"],
  authors: [{ name: "یکاسنج" }],
  openGraph: {
    title: "یکاسنج | مبدل آنی یکاهای فیزیک",
    description: "تبدیل سریع و دقیق یکاهای فیزیک — طول، جرم، دما، نیرو، انرژی، فشار و بیش از ۲۰ کمیت دیگر.",
    url: siteUrl,
    siteName: "یکاسنج",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "یکاسنج | مبدل آنی یکاهای فیزیک",
    description: "تبدیل سریع و دقیق یکاهای فیزیک برای دانش‌آموزان و دانشجویان.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans text-slate-100 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
