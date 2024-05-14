import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Provider from "@/lib/Provider/Provider";
import { Toaster } from "sonner";

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
    <Provider>
      <html lang="en">
        <body className={notoSerif.className}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <Toaster position="top-center" />
        </body>
      </html>
    </Provider>
  );
}
