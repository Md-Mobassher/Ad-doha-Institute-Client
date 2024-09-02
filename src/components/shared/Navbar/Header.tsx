"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu, { Item } from "./Menu";
import assets from "@/assets";
import { Box, Container } from "@mui/material";
import LoginButton from "./LoginButton";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCross } from "react-icons/fa";
import { X } from "@mui/icons-material";

interface HeaderProps {
  top?: number;
  header?: number;
  menu?: number;
}

const menus: Item[] = [
  {
    title: "হোম",
    link: "/",
  },
  {
    title: "আমাদের সম্পর্কে",
    link: "#",
    option: "sub",
    subItems: [
      {
        title: "লক্ষ্য ও উদ্দেশ্য",
        link: "/about/aims-&-objectives",
      },
      { title: "পরিচালনা পর্ষদ", link: "/about/board-of-director" },
      { title: "উপদেষ্টা কমিটি", link: "/about/advisory-committee" },
      { title: "শিক্ষক প্যানেল", link: "/about/faculty" },
    ],
  },
  { title: "কোর্স", link: "/courses" },
  {
    title: "সেবা",
    link: "/services",
    option: "sub",
    subItems: [
      {
        title: "বাসস্থান নির্মাণে সহায়তা",
        link: "/services/assistance-in-housing-construction",
      },
      {
        title: "কর্মসংস্থান সহায়তা",
        link: "/services/employment-ssistance",
      },
      {
        title: "চিকিৎসা সহায়তা",
        link: "/services/medical-assistance",
      },
      {
        title: "শিক্ষা সহায়তা",
        link: "/services/educational-assistance",
      },
      { title: "কর্জে হাসানাহ", link: "/services/korze-hasanah" },
      { title: "আইনী সহায়তা", link: "/services/legal-aid" },
      { title: "বিয়ে", link: "/services/marriage" },
      {
        title: "সুন্নাতে খাৎনা",
        link: "/services/sunnah-circumcision",
      },
    ],
  },
  {
    title: "রিসোর্স",
    link: "#",
    option: "sub",
    subItems: [
      {
        title: "পাঠাগার",
        link: "/resources/library",
      },
      {
        title: "ভিডিও",
        link: "/resources/videos",
      },
      {
        title: "গ্যালারী",
        link: "/resources/gallery",
      },
      { title: "ব্লগ", link: "/resources/blog" },
    ],
  },
  {
    title: "যোগাযোগ",
    link: "/contact",
  },
];

const Header: React.FC<HeaderProps> = ({ top, header, menu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="flex items-center justify-between gap-1">
              <Link href="/">
                <div className="lg:w-[280px] md:w-[240px] w-[220px]">
                  <Image
                    src={assets.logo.headerlogo}
                    width={280}
                    height={70}
                    alt="logo"
                  />
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
              <div className="hidden md:block ">
                {menu === 1 && <Menu items={menus} />}
              </div>
              <div className="hidden md:block ">
                <LoginButton />
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden ">
                <Menu items={menus} />
                <LoginButton />
              </div>
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default Header;
