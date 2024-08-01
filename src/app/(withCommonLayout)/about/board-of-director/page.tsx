import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import { Stack } from "@mui/material";
import DohaContainer from "@/components/ui/DohaContainer";

const BoardOfDirectorPage = () => {
  return (
    <DohaContainer>
      <Stack justifyContent="center" alignItems="center">
        <Image src={commingSoon} alt="coming soon image" />
      </Stack>
    </DohaContainer>
  );
};

export default BoardOfDirectorPage;
