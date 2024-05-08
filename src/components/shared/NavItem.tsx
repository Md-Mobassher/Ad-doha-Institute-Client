"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";
import { navbarItemsData } from "@/data/navbar";

const NavItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between max-w-7xl mx-auto items-center">
        {/*  large device menu */}
        <div className="hidden md:block">
          <div className="flex justify-end items-center">
            {navbarItemsData.map((item) => (
              <Link key={item.id} className="rounded-lg" href={item.link}>
                <div className="bg-white px-3 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
                  {item.title}
                </div>
              </Link>
            ))}
            <div className="ml-2">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button (visible on small screens) */}
        <div className="-mr-2 flex md:hidden p-2 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className=" text-slate-700  rounded"
            aria-controls="mobile-menu"
            aria-expanded={isOpen ? "true" : "false"}
          >
            {isOpen ? (
              <div className="p-1 border rounded-md hover:bg-green-500 hover:text-white">
                <RxCross2 className="size-8" />
              </div>
            ) : (
              <div className="p-1 border rounded-md hover:bg-green-500 hover:text-white">
                <GiHamburgerMenu className="size-8" />
              </div>
            )}
            {isOpen && (
              <div className="flex flex-col pb-3 w-60 top-14 right-2 shadow-lg rounded-md absolute transition-all duration-500 border bg-white">
                {navbarItemsData.map((item) => (
                  <Link key={item.id} className="rounded-lg" href={item.link}>
                    <div className=" px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
                      {item.title}
                    </div>
                  </Link>
                ))}
                <div className="mt-2">
                  <LanguageToggle />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavItems;
