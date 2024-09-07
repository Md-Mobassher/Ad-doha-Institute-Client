import { Box } from "@mui/material";
import BannerSection from "./home/BannerSection";
import AboutSection from "./home/AboutSection";
import ProjectsSection from "./home/ProjectsSection";
import CoursesSection from "./home/CoursesSection";
import DepartmentsSection from "./home/DepartmentsSection";
import StudentsCornerSection from "./home/StudentsCorner";
import OpinionOfAlim from "./home/OpinionOfAlim";
import TeachersPanel from "./home/TeachersPanel";
import VideosSection from "./home/VideosSection";
import EPathagar from "./home/EPathagar";

const HomePage = () => {
  return (
    <Box>
      <BannerSection />
      <AboutSection />
      <ProjectsSection />
      <CoursesSection />
      <DepartmentsSection />
      <EPathagar />
      <StudentsCornerSection />
      <OpinionOfAlim />
      <TeachersPanel />
      <VideosSection />
    </Box>
  );
};

export default HomePage;
