import { Box } from "@mui/material";
import BannerSection from "./home/BannerSection";
import AboutSection from "./home/AboutSection";
import ProjectsSection from "./home/ProjectsSection";
import CoursesSection from "./home/CoursesSection";
import DepartmentsSection from "./home/DepartmentsSection";
import BooksSection from "./home/BooksSection";
import StudentsCornerSection from "./home/StudentsCorner";
import OpinionOfAlim from "./home/OpinionOfAlim";
import TeachersPanel from "./home/TeachersPanel";
import VideosSection from "./home/VideosSection";

const HomePage = () => {
  return (
    <Box>
      <BannerSection />
      <AboutSection />
      <ProjectsSection />
      <CoursesSection />
      <DepartmentsSection />
      <BooksSection />
      <StudentsCornerSection />
      <OpinionOfAlim />
      <TeachersPanel />
      <VideosSection />
    </Box>
  );
};

export default HomePage;
