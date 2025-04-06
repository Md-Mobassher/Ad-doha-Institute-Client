"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { useTranslations } from "next-intl";
import { logoutUser } from "@/services/actions/logoutUser";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

type SubItem = {
  title: string;
  link: string;
};

export type Item = {
  title: string;
  link: string;
  option?: "sub" | undefined;
  subItems?: SubItem[] | undefined;
};

type MenuProps = {
  items: Item[];
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const router = useRouter();
  const userInfo = useUserInfo();
  const t = useTranslations("Header");

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <div className="z-20 block sticky top-0 w-full">
      <div className="flex lg:flex-row md:flex-row flex-col lg:justify-end lg:items-center lg:gap-1 md:gap-0.5 gap-0 flex-wrap">
        {items.map((item, index) => (
          <div
            key={index}
            className={` ${item.option === "sub" ? "relative" : ""}`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <Link
              href={item.link}
              className="p-2 text-white hover:text-[#0F473C] block hover:bg-[#F7F3E7] font-semibold lg:rounded-full lg:px-3 md:px-2 px-2 py-2"
            >
              {item.title}
            </Link>
            {hoverIndex === index && item.option === "sub" && item.subItems && (
              <div className="absolute lg:left-0 md:left-0 left-28 bg-gray-200 shadow-lg w-52 border border-[#F7F3E7] z-50">
                <div className="flex flex-col">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className={`p-2 bg-[#F7F3E7] text-[#0F473C] hover:text-[#F7F3E7] block hover:bg-[#0F473C] font-semibold ${
                        subIndex === 0 &&
                        subIndex &&
                        "border-b border-green-400"
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {userInfo?.userId ? (
          <Link
            href={"/dashboard"}
            className="lg:rounded-full lg:px-4 md:px-3 px-2 py-2 text-white hover:text-[#0F473C] inline hover:bg-[#F7F3E7] font-semibold"
          >
            {t("LoginBtn.dashboard")}
          </Link>
        ) : null}

        {userInfo?.userId ? (
          <h5
            onClick={() => handleLogOut()}
            className="lg:rounded-full lg:px-4 md:px-3 px-2 py-2 text-white hover:text-[#0F473C]  hover:bg-[#F7F3E7] font-semibold cursor-pointer"
          >
            {t("LoginBtn.logout")}
          </h5>
        ) : (
          <Link
            href={"/login"}
            className="lg:rounded-full lg:px-4 md:px-3 px-2 py-2 text-white hover:text-[#0F473C] hover:bg-[#F7F3E7] font-semibold"
          >
            {t("LoginBtn.login")}
          </Link>
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Menu;
