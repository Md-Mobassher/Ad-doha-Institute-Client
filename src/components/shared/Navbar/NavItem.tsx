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
  // console.log(userInfo);

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
          <Typography
            key={item.id}
            component={Button}
            sx={{
              backgroundColor: "white",
              boxShadow: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: "10px",

              ":hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={() => handleNavigate(item.link)}
          >
            {item.title}
          </Typography>
        ))}

        {userInfo?.userId ? (
          <Typography
            component={Button}
            sx={{
              backgroundColor: "white",
              boxShadow: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: "10px",
              ":hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            ড্যাশবোর্ড
          </Typography>
        ) : null}

        {userInfo?.userId ? (
          <Typography
            component={Button}
            sx={{
              backgroundColor: "red",
              boxShadow: "none",
              color: "white",
              fontSize: "15px",
              fontWeight: 500,
              px: "12px",
              ":hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={() => handleLogOut()}
          >
            লগআউট
          </Typography>
        ) : (
          <Typography
            component={Button}
            sx={{
              boxShadow: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: "14px",
              backgroundColor: "primary.main",
              color: "white",
            }}
            onClick={() => handleNavigate("login")}
          >
            লগিন
          </Typography>
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
              <Box className="p-1 border rounded-md hover:bg-green-500 hover:text-white">
                <RxCross2 className="size-8" />
              </Box>
            ) : (
              <Box className="p-1 border rounded-md hover:bg-green-500 hover:text-white">
                <GiHamburgerMenu className="size-8" />
              </Box>
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
                    <Typography
                      key={item.id}
                      component={Button}
                      sx={{
                        backgroundColor: "white",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "10px",
                        ":hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      onClick={() => handleNavigate(item.link)}
                      py="8px"
                      fullWidth
                    >
                      {item.title}
                    </Typography>
                  ))}

                  {userInfo?.userId ? (
                    <Typography
                      component={Button}
                      sx={{
                        backgroundColor: "white",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "10px",
                        ":hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      onClick={() => handleNavigate("dashboard")}
                      py="8px"
                      fullWidth
                    >
                      ড্যাশবোর্ড
                    </Typography>
                  ) : null}

                  {userInfo?.userId ? (
                    <Typography
                      component={Button}
                      sx={{
                        backgroundColor: "red",
                        boxShadow: "none",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "12px",
                        ":hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      onClick={() => handleLogOut()}
                      fullWidth
                    >
                      লগআউট
                    </Typography>
                  ) : (
                    <Typography
                      component={Button}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "14px",
                      }}
                      onClick={() => handleNavigate("login")}
                      fullWidth
                    >
                      লগিন
                    </Typography>
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
