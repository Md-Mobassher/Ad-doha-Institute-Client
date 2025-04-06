"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COOKIE_NAME = "AD_DOHA_LOCALE";
const COOKIE_PATH = "path=/; max-age=31536000"; // 1 year

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<"en" | "bn">("en");
  const router = useRouter();

  // Load locale from cookie or browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_NAME}=`))
        ?.split("=")[1] as "en" | "bn" | undefined;

      if (cookieLocale === "en" || cookieLocale === "bn") {
        setLocale(cookieLocale);
      } else {
        const browserLocale = (
          navigator.language.startsWith("bn") ? "bn" : "en"
        ) as "en" | "bn";
        setLocale(browserLocale);
        document.cookie = `${COOKIE_NAME}=${browserLocale}; ${COOKIE_PATH}`;
        router.refresh();
      }
    }
  }, [router]);

  // Change locale and refresh
  const handleChangeLocale = (newLocale: "en" | "bn") => {
    if (locale !== newLocale) {
      document.cookie = `${COOKIE_NAME}=${newLocale}; ${COOKIE_PATH}`;
      setLocale(newLocale);
      router.refresh(); // Refreshes server component with new cookie
    }
  };

  return (
    <div className="flex w-[70px] my-auto h-8 border rounded overflow-hidden md:ml-0 ml-2">
      <button
        className={`w-full py-1 px-1.5 font-semibold inline transition ${
          locale === "bn"
            ? "bg-[#F7F3E7] text-[#0F473C]"
            : "bg-[#0F473C] text-[#F7F3E7]"
        }`}
        onClick={() => handleChangeLocale("bn")}
      >
        বাং
      </button>
      <button
        className={`w-full py-1 px-1.5 font-semibold inline transition ${
          locale === "en"
            ? "bg-[#F7F3E7] text-[#0F473C]"
            : "bg-[#0F473C] text-[#F7F3E7]"
        }`}
        onClick={() => handleChangeLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
