import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo/favicon.webp";
import Link from "next/link";

const LoginFormTitle = () => {
  return (
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
            component="h4"
            variant="h4"
            fontWeight={600}
            mt="12px"
            mb="4px"
            color="black"
          >
            Ad-Doha Institute
          </Typography>
          <Typography component="p" fontWeight={600}>
            An educational, research, preaching and service institution
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
};

export default LoginFormTitle;
