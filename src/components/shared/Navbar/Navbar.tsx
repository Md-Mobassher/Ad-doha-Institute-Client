import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { Box, Container, Stack, Typography } from "@mui/material";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import LoginButton from "./LoginButton";

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        py: "8px",
        position: "sticky",
        top: "0px",
        zIndex: "50",
      }}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            component={Link}
            href="/"
            className=" text-4xl font-semibold"
          >
            <Image
              src={assets.logo.headerlogo}
              width={250}
              height={50}
              alt="logo"
            />
          </Typography>

          {/* menu items */}

          <DesktopMenu />

          <LoginButton />

          <MobileMenu />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
