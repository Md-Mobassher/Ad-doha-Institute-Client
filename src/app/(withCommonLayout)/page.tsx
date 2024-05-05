import slide4 from "@/assets/images/banner/বয়স্কদের-দোহা-মক্তব.png.webp";
import Activities from "@/components/ui/HomePage/Activities";
import Banner from "@/components/ui/HomePage/Banner";
import Courses from "@/components/ui/HomePage/Courses";
import Services from "@/components/ui/HomePage/Services";

const slides = [
  { imageUrl: slide4 },
  { imageUrl: slide4 },
  { imageUrl: slide4 },
  { imageUrl: slide4 },
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
