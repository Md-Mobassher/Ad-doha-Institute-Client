import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Toaster } from "sonner";
import Providers from "@/lib/Provider/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "600", "700"],
  subsets: ["latin", "bengali"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  const title = messages?.HomePage?.metaTitle;
  const description = messages?.HomePage?.metaDescription;

  return {
    title,
    description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <Providers>
      <html lang={locale} data-theme={"light"} suppressHydrationWarning={true}>
        <body className={`${hindSiliguri.className}`}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </body>
      </html>
    </Providers>
  );
}
