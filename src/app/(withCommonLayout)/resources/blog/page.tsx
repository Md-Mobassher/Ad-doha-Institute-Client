import { Box, Stack } from "@mui/material";
import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";
import PageTitle from "@/components/ui/PageTitle";

const BlogPage = () => {
  return (
    <Box>
      <PageTitle title="ব্লগ" />

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

export default BlogPage;
