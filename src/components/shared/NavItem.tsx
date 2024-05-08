"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";

const navItem = (
  <>
    <Link className="rounded-lg" href="/">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Home
      </div>
    </Link>

    <Link className="rounded-lg" href="/about">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        About
      </div>
    </Link>
    <Link className="rounded-lg" href="/projects">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Projects
      </div>
    </Link>
    <Link className="rounded-lg" href="/services">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Services
      </div>
    </Link>
    {/* <Link className="rounded-lg" href="/registration">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Registration
      </div>
    </Link> */}
    <Link className="rounded-lg" href="/resourses">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Resourses
      </div>
    </Link>

    <Link className="rounded-lg" href="/contact">
      <div className="bg-white px-4 py-2 rounded text-md font-semibold text-black hover:bg-green-500 hover:text-white">
        Contact
      </div>
    </Link>
    <LanguageToggle />
  </>
);

const NavItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between max-w-7xl mx-auto items-center">
        {/*  large device menu */}
        <div className="hidden md:block">
          <div className="flex justify-end items-center">{navItem}</div>
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
              <div className="flex flex-col pt-5 w-60 top-8 right-0 shadow-lg rounded-md absolute transition-all duration-500">
                {navItem}
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavItems;
