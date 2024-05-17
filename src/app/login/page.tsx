import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Link href="/">
                <Image
                  src={assets.logo.logo}
                  width={60}
                  height={60}
                  alt="logo"
                />
              </Link>
            </Box>
            <Box>
              <Link href="/">
                <Typography
                  variant="h5"
                  fontWeight={600}
                  mt="12px"
                  mb="4px"
                  color="black"
                >
                  আদ-দোহা ইনস্টিটিউট
                </Typography>
                <Typography component="p" fontWeight={600}>
                  একটি শিক্ষা, গবেষণা, দাওয়াহ ও সেবামূলক প্রতিষ্ঠান
                </Typography>
              </Link>
            </Box>
          </Stack>

          <LoginForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
