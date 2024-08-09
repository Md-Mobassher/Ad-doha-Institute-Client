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
import { ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        <Stack direction="row" justifyContent="end" alignItems="center">
          {navbarItemsData?.map((item, index) => (
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
                      <MenuItem
                        key={subItem.id}
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
            </Typography>
          ))}
        </Stack>
      </Hidden>
    </Box>
  );
};

export default DesktopMenu;
