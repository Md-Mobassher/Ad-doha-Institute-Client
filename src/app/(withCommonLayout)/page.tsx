import assets from "@/assets";
import AboutSection from "@/components/ui/HomePage/AboutSection";
import BannerSection from "@/components/ui/HomePage/BannerSection";
import BooksSection from "@/components/ui/HomePage/BooksSection";
import CoursesSection from "@/components/ui/HomePage/CoursesSection";
import DepartmentsSection from "@/components/ui/HomePage/DepartmentsSection";
import ProjectsSection from "@/components/ui/HomePage/ProjectsSection";
import StudentsCornerSection from "@/components/ui/HomePage/StudentsCorner";
import VideosSection from "@/components/ui/HomePage/VideosSection";
import { Box } from "@mui/material";

const slides = [
  { imageUrl: assets.banner.slide1 },
  { imageUrl: assets.banner.slide2 },
  { imageUrl: assets.banner.slide3 },
];

const HomePage = () => {
  return (
    <Box>
      <BannerSection slides={slides} />
      <AboutSection />
      <ProjectsSection />
      <CoursesSection />
      <DepartmentsSection />
      <BooksSection />
      <StudentsCornerSection />
      <VideosSection />
    </Box>
  );
};

export default HomePage;
