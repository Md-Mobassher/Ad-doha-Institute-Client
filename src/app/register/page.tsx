import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import logo from "@/assets/logo/favicon.webp";

const RegisterPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: {
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
            },
            my: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0,
            },
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
                <Image src={logo} width={60} height={60} alt="logo" />
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

          <RegisterForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
