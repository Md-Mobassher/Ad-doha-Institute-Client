import PageTitle from "@/components/ui/PageTitle";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";

const GalleryPage = () => {
  return (
    <Box>
      <PageTitle title="ছবি সমূহ" />

      <Stack justifyContent="center" alignItems="center">
        <Image
          src={commingSoon}
          alt="coming soon image"
          width={800}
          height={500}
        />
      </Stack>
    </Box>
  );
};

export default GalleryPage;
