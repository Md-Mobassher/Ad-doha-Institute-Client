import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Box } from "@mui/material";

const GalleryPage = () => {
  return (
    <Box>
      <PageTitle title="ছবি সমূহ" />
      <DohaContainer>
        <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7"></Box>
      </DohaContainer>
    </Box>
  );
};

export default GalleryPage;
