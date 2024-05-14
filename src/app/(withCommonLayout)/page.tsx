import assets from "@/assets";
import BannerSection from "@/components/ui/HomePage/BannerSection";
import BooksSection from "@/components/ui/HomePage/BooksSection";
import CoursesSection from "@/components/ui/HomePage/CoursesSection";
import ProjectsSection from "@/components/ui/HomePage/ProjectsSection";
import ServicesSection from "@/components/ui/HomePage/ServicesSection";
import VideosSection from "@/components/ui/HomePage/VideosSection";
import { Container } from "@mui/material";

const slides = [
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
];

const HomePage = () => {
  return (
    <Container>
      <BannerSection slides={slides} />
      <ProjectsSection />
      <ServicesSection />
      <CoursesSection />
      <BooksSection />
      <VideosSection />
    </Container>
  );
};

export default HomePage;
