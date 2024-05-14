import { Box } from "@mui/material";
import React from "react";

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box className="lg:mt-20 md:mt-16 mt-12 lg:mb-8 md:mb-8 mb-6  px-2">
      {children}
    </Box>
  );
};

export default Container;
