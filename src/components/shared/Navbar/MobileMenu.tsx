"use client";

import { navbarItemsData } from "@/data/navbar";
import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Hidden,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const userInfo = useUserInfo();

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenu(index);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  const handleLogOut = () => {
    logoutUser(router);
  };

  const handleNavigate = (link: string) => {
    router.push(`/${link}`);
  };

  return (
    <>
      <Hidden smUp>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className=" text-green-500 rounded rounded-primary"
            aria-controls="mobile-menu"
            aria-expanded={isOpen ? "true" : "false"}
          >
            {isOpen ? (
              <Box
                sx={{
                  padding: "5px",
                  border: "1px solid secondary.main",
                  borderRadius: "5px",
                  color: "secondary.main",
                  ":hover": {
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                  },
                }}
              >
                <RxCross2 className="size-8" />
              </Box>
            ) : (
              <Box
                sx={{
                  padding: "5px",
                  border: "1px solid secondary.main",
                  borderRadius: "5px",
                  color: "secondary.main",
                  ":hover": {
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                  },
                }}
              >
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
                  {navbarItemsData.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      sx={{
                        width: "100%",
                        backgroundColor: "secondary.main",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "15px",
                        py: "0px",
                        textAlign: "start",
                        borderBottom:
                          index === navbarItemsData.length - 1
                            ? "none"
                            : "1px solid gray",
                        ":hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      onClick={(e) => {
                        handleNavigate(item.link);
                        handleMouseEnter(e, index);
                      }}
                    >
                      {item.title}
                      {item.subItems && (
                        <>
                          <ExpandMore sx={{ ml: "5px" }} />
                          <Menu
                            anchorEl={anchorEl}
                            open={openSubMenu === index}
                            onClose={handleMouseLeave}
                            MenuListProps={{ onMouseLeave: handleMouseLeave }}
                            sx={{
                              boxShadow: "none",
                              padding: "0px 0px",
                            }}
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <MenuItem
                                key={subItem.id}
                                sx={{
                                  width: "225px",
                                  boxShadow: "none",
                                  fontSize: "15px",
                                  fontWeight: 500,
                                  pl: "25px",
                                  borderBottom:
                                    subIndex === item.subItems.length - 1
                                      ? "none"
                                      : "1px solid gray",

                                  ":hover": {
                                    backgroundColor: "primary.main",
                                    color: "secondary.main",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigate(subItem.link);
                                }}
                              >
                                {subItem.title}
                              </MenuItem>
                            ))}
                          </Menu>
                        </>
                      )}
                    </MenuItem>
                  ))}

                  {userInfo?.userId ? (
                    <Typography
                      component={Button}
                      sx={{
                        borderTop: "1px solid green",
                        backgroundColor: "success.main",
                        color: "secondary.main",
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
                        border: "1px solid secondary.main",
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
        </Box>
      </Hidden>
    </>
  );
};

export default MobileMenu;
