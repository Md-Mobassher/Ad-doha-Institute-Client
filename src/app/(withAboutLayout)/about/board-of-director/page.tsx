import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import { Box, Stack } from "@mui/material";

const BoardOfDirectorPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Image src={commingSoon} alt="coming soon image" />
    </Stack>
  );
};

export default BoardOfDirectorPage;
