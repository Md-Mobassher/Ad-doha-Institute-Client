import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import {
//   appWithTranslation,
//   I18nProvider,
// } from "next-translate/appWithTranslation";

const inter = Inter({ subsets: ["latin"] });
const notoSerif = Noto_Serif_Bengali({ subsets: ["bengali"] });

export const metadata: Metadata = {
  title: "Ad-doha Institute",
  description:
    "Ad-doha Institute; An educational, research, dawah and service institution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={notoSerif.className}>{children}</body>
    </html>
  );
}
