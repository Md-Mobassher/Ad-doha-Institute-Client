"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";
import { navbarItemsData } from "@/data/navbar";
import { useRouter } from "next/navigation";
import { Box, Hidden, Stack } from "@mui/material";

const NavItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (link: string) => {
    router.push(`/${link}`);
  };

  return (
    <Box>
      {/*  large device menu */}
      <Hidden smDown>
        {navbarItemsData.map((item) => (
          <Box
            key={item.id}
            className="bg-white px-3 py-2 text-md font-semibold text-black hover:bg-green-500 hover:text-white cursor-pointer btn border-0 shadow-none inline"
            onClick={() => handleNavigate(item.link)}
          >
            {item.title}
          </Box>
        ))}
        {/* <div className="ml-2">
              <LanguageToggle />
            </div> */}
        <Link href={"/login"}>
          <div className="bg-primary text-white px-3 py-2 text-md font-semibold hover:bg-secondary hover:text-white rounded-lg cursor-pointer btn shadow-none hover:border-primary border-primary border inline">
            লগিন
          </div>
        </Link>
        {/* <Link href={"/login"}>
            <div className="bg-primary text-white px-3 py-2 text-md font-semibold hover:bg-secondary hover:text-white rounded-lg cursor-pointer btn shadow-none hover:border-primary border-primary border inline">
              লগআউট
            </div>
          </Link> */}
      </Hidden>

      {/* Mobile Menu Button (visible on small screens) */}
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Hidden smUp>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className=" text-green-500 rounded rounded-primary"
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
              <Box
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: "60px",
                  right: "0px",
                  width: "220px",
                  boxShadow: "0 1px 5px 0px",
                  borderRadius: "10px",
                }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  {navbarItemsData.map((item) => (
                    <Box
                      key={item.id}
                      className="bg-white text-md font-semibold text-black hover:bg-green-500    hover:text-white cursor-pointer  shadow-none "
                      onClick={() => handleNavigate(item.link)}
                      py="8px"
                      width="100%"
                    >
                      {item.title}
                    </Box>
                  ))}
                  {/* <div className="mt-2">
                    <LanguageToggle />
                  </div> */}
                </Stack>
              </Box>
            )}
          </button>
        </Hidden>
      </Box>
    </Box>
  );
};

export default NavItems;
