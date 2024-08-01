"use client";

import { navbarItemsData } from "@/data/navbar";
import {
  Box,
  Button,
  Hidden,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";

const DesktopMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<null | number>(null);
  const router = useRouter();

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenu(index);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  const handleNavigate = (link: string) => {
    router.push(`/${link}`);
  };

  return (
    <Box>
      <Hidden smDown>
        <Stack direction="row" justifyContent="start" alignItems="center">
          {navbarItemsData.map((item, index) => (
            <Typography
              key={item.id}
              component={Button}
              sx={{
                color: "secondary.main",
                boxShadow: "none",
                fontSize: "15px",
                fontWeight: 500,
                px: "10px",
                display: "flex",
                alignItems: "center",

                ":hover": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                },
              }}
              onClick={() => handleNavigate(item.link)}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}
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
                      <Link href={subItem.link} passHref key={subItem.id}>
                        <MenuItem
                          sx={{
                            width: "220px",
                            boxShadow: "none",
                            fontSize: "15px",
                            fontWeight: 500,
                            px: "20px",
                            borderBottom:
                              subIndex === item.subItems.length - 1
                                ? "none"
                                : "1px solid gray",

                            ":hover": {
                              backgroundColor: "primary.main",
                              color: "secondary.main",
                            },
                          }}
                        >
                          {subItem.title}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </>
              )}
            </Typography>
          ))}
        </Stack>
      </Hidden>
    </Box>
  );
};

export default DesktopMenu;
