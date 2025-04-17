import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/logo/favicon.webp";
import Link from "next/link";

const LoginFormTitle = ({ title }: { title?: string }) => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {title && (
        <Typography
          component="h4"
          variant="h4"
          fontWeight={600}
          mb="5px"
          color="primary.main"
        >
          {title}
        </Typography>
      )}
      <Box>
        <Link href="/">
          <Image src={logo} width={60} height={60} alt="logo" />
        </Link>
      </Box>
      <Box>
        <Link href="/">
          <Typography
            component="h5"
            variant="h5"
            fontWeight={600}
            mt="10px"
            mb="4px"
            color="black"
          >
            Ad-Doha Institute
          </Typography>
          <Typography component="p" fontWeight={500}>
            An educational, research, preaching and service institution
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
};

export default LoginFormTitle;
