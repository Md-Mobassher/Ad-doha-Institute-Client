import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Toaster } from "sonner";
import Providers from "@/lib/Provider/Providers";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "600", "700"],
  subsets: ["latin", "bengali"],
});

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
    <Providers>
      <html lang="en" data-theme={"light"} suppressHydrationWarning>
        <body className={`${hindSiliguri.className}`}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <Toaster position="top-center" />
        </body>
      </html>
    </Providers>
  );
}
