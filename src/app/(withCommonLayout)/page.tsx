import { assets } from "@/assets";
import Banner from "@/components/ui/HomePage/Banner";
import Courses from "@/components/ui/HomePage/Courses";
import Services from "@/components/ui/HomePage/Services";
import Projects from "@/components/ui/HomePage/Projects";

const slides = [
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
];

const HomePage = () => {
  return (
    <div className=" max-w-7xl mx-auto">
      <Banner slides={slides} />
      <Projects />
      <Services />
      <Courses />
    </div>
  );
};

export default HomePage;
