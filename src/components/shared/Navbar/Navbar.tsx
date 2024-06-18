import Link from "next/link";
import NavItems from "./NavItem";
import { FaFacebookF, FaMobileAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineYoutube } from "react-icons/ai";
import Image from "next/image";
import assets from "@/assets";
import { Box, Container, Hidden, Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <>
      {/* header top */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "#fff",
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap="15px"
              fontSize="14px"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="5px"
              >
                <FaMobileAlt /> <p>+88 01916016099</p>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="5px"
              >
                <HiOutlineMail className="size-5" /> <p>info@ad-doha.org​</p>
              </Stack>
            </Stack>
            <Hidden smDown>
              <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
              >
                <Box
                  component={Link}
                  href="https://www.facebook.com/addoha.org"
                  target="_blank"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    py: "5px",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "primary.main",
                    },
                  }}
                >
                  <FaFacebookF className="size-5" />
                </Box>
                <Box
                  component={Link}
                  href="https://www.youtube.com/channel/UC6m__rWQY4zybxI3r14mPVg"
                  target="_blank"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    py: "3px",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "primary.main",
                    },
                  }}
                >
                  <AiOutlineYoutube className="size-6" />
                </Box>
              </Stack>
            </Hidden>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          py: "2px",
          position: "sticky",
          top: "0px",
          zIndex: "50",
          boxShadow: "0 0.5px 5px 0px",
        }}
      >
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component={Link}
              href="/"
              className="flex-1 text-4xl font-semibold"
            >
              <Image
                src={assets.logo.headerlogo}
                width={250}
                height={50}
                alt="logo"
              />
            </Typography>
            <NavItems />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
