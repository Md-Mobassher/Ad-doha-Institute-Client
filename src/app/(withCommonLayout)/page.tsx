import assets from "@/assets";
import AboutSection from "@/components/ui/HomePage/AboutSection";
import BannerSection from "@/components/ui/HomePage/BannerSection";
import BooksSection from "@/components/ui/HomePage/BooksSection";
import CoursesSection from "@/components/ui/HomePage/CoursesSection";
import ProjectsSection from "@/components/ui/HomePage/ProjectsSection";
import ServicesSection from "@/components/ui/HomePage/ServicesSection";
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
      <ServicesSection />
      <CoursesSection />
      <BooksSection />
      <VideosSection />
    </Box>
  );
};

export default HomePage;
