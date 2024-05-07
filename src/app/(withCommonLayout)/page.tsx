import assets from "@/assets";
import BannerSection from "@/components/ui/HomePage/BannerSection";
import BooksSection from "@/components/ui/HomePage/BooksSection";
import CoursesSection from "@/components/ui/HomePage/CoursesSection";
import ProjectsSection from "@/components/ui/HomePage/ProjectsSection";
import ServicesSection from "@/components/ui/HomePage/ServicesSection";
import VideosSection from "@/components/ui/HomePage/VideosSection";

const slides = [
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
];

const HomePage = () => {
  return (
    <div className=" max-w-7xl mx-auto">
      <BannerSection slides={slides} />
      <ProjectsSection />
      <ServicesSection />
      <CoursesSection />
      <BooksSection />
      <VideosSection />
    </div>
  );
};

export default HomePage;
