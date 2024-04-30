import Banner from "./home/Banner";
import slide1 from "@/assets/images/banner/web-poster.png.webp";
import slide2 from "@/assets/images/banner/Moktob-web2-1.png.webp";
import slide3 from "@/assets/images/banner/দাওয়াহ-প্রশিক্ষণ-কর্মশালা.png.webp";
import slide4 from "@/assets/images/banner/বয়স্কদের-দোহা-মক্তব.png.webp";
import slide5 from "@/assets/images/courses/running-course.jpg";
import Activities from "./home/Activities";
import Services from "./home/Services";
import Courses from "./home/Courses";

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
