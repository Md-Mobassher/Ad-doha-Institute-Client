"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { X } from "@mui/icons-material";
import headerlogo from "@/assets/logo/logo.png";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface HeaderProps {
  top?: number;
  header?: number;
  menu?: number;
}

const Header: React.FC<HeaderProps> = ({ top, header, menu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = useTranslations("Header");
  const menus = t.raw("Menu") as any[];

  return (
    <>
      {header === 1 && (
        <Box
          sx={{
            backgroundColor: "primary.main",
            py: "8px",
            position: "sticky",
            top: "0px",
            zIndex: "10",
          }}
        >
          <Container
            sx={{
              py: {
                xl: "5px",
                lg: "5px",
                md: "6px",
                sm: "7px",
                xs: "6px",
              },
              px: {
                xl: "0px",
                lg: "60px",
                md: "50px",
                sm: "12px",
                xs: "10px",
              },
            }}
          >
            <div className="flex items-center  justify-between">
              <Link href="/" className="">
                <div className="lg:w-[280px] md:w-[240px] w-[220px]">
                  <Image src={headerlogo} width={280} height={70} alt="logo" />
                </div>
              </Link>
              {/* Toggle button for mobile menu */}
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-7 " />
                ) : (
                  <GiHamburgerMenu className="size-7 " />
                )}
              </button>
              <div className="hidden md:flex  flex-wrap">
                {menu === 1 && <Menu items={menus} />}
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden ">
                <Menu items={menus} />
              </div>
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default Header;
