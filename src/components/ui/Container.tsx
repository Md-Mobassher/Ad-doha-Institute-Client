import { Box } from "@mui/material";
import React from "react";

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box
      sx={{
        mt: {
          lg: "80px",
          md: "70px",
          sm: "60px",
          xs: "50px",
        },
        mb: {
          lg: "32px",
          md: "30px",
          sm: "28px",
          xs: "24px",
        },

        px: "8px",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
