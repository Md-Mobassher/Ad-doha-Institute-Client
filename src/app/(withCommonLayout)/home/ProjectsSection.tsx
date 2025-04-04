import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/DohaContainer";
import { Box, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

const ProjectsSection = () => {
  const t = useTranslations("HomePage");
  const translatedProjects = t.raw("projectSec.projectsData") as any[];

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title={t("projectSec.title")} />
        </Stack>

        <Box>
          <Slider
            items={translatedProjects}
            slidesPerView={3}
            navigate="projects"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
