import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/DohaContainer";
import { projectsData } from "@/data/projects";
import DohaButton from "../DohaButton";
import { Box, Stack } from "@mui/material";

const ProjectsSection = () => {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="আমাদের কার্যক্রম" />
        <DohaButton btnTitle="সকল" navigate="projects" />
      </Stack>

      <Box>
        <Slider
          items={projectsData}
          slidesPerView={3}
          btnTitle="বিস্তারিত"
          navigate="projects"
        />
      </Box>
    </Container>
  );
};

export default ProjectsSection;
