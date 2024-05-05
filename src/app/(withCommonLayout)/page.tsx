import assets from "@/assets";
import Activities from "@/components/ui/HomePage/Activities";
import Banner from "@/components/ui/HomePage/Banner";
import Courses from "@/components/ui/HomePage/Courses";
import Services from "@/components/ui/HomePage/Services";

const slides = [
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
  { imageUrl: assets.banner.poster2 },
];

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <Banner slides={slides} />
      <Activities />
      <Services />
      <Courses />
    </div>
  );
};

export default HomePage;
