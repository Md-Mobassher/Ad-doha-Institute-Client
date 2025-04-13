"use client";
import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo/favicon.webp";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import { UserRole } from "@/type";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // console.log(userRole);

  useEffect(() => {
    if (!user) return;

    setUserRole(user.role);
  }, [user]);

  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={logo} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h2"
          sx={{
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Ad-Doha Institute
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
