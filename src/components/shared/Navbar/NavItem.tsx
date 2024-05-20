"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { navbarItemsData } from "@/data/navbar";
import { useRouter } from "next/navigation";
import { Box, Button, Hidden, Stack, Typography } from "@mui/material";
import { logoutUser } from "@/services/actions/logoutUser";
import useUserInfo from "@/hooks/useUserInfo";

const NavItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const userInfo = useUserInfo();
  console.log(userInfo);

  const handleLogOut = () => {
    logoutUser(router);
  };

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
            className="bg-white px-3 py-[10px] text-md font-semibold text-black hover:bg-green-500 hover:text-white cursor-pointer btn border-0 rounded-md shadow-none inline"
            onClick={() => handleNavigate(item.link)}
          >
            {item.title}
          </Box>
        ))}

        {userInfo?.userId ? (
          <Box
            className="bg-white px-3 py-[10px] text-md font-semibold text-black hover:bg-green-500 hover:text-white cursor-pointer btn border-0 rounded-md shadow-none inline"
            component={Link}
            href="/dashboard"
          >
            ড্যাশবোর্ড
          </Box>
        ) : null}

        {userInfo?.userId ? (
          <Button color="error" onClick={handleLogOut} sx={{ boxShadow: 0 }}>
            লগআউট
          </Button>
        ) : (
          <Button component={Link} href="/login">
            লগিন
          </Button>
        )}
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

                  {userInfo?.userId ? (
                    <Box
                      className="bg-white text-md font-semibold text-black hover:bg-green-500    hover:text-white cursor-pointer  shadow-none "
                      component={Link}
                      href="/dashboard"
                      py="8px"
                      width="100%"
                    >
                      ড্যাশবোর্ড
                    </Box>
                  ) : null}

                  {userInfo?.userId ? (
                    <Button
                      color="error"
                      onClick={handleLogOut}
                      sx={{ boxShadow: 0 }}
                      fullWidth
                    >
                      লগআউট
                    </Button>
                  ) : (
                    <Button fullWidth component={Link} href="/login">
                      লগিন
                    </Button>
                  )}
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
