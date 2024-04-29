import Banner from "./home/Banner";
import slide1 from "@/assets/image/banner/web-poster.png.webp";
import slide2 from "@/assets/image/banner/Moktob-web2-1.png.webp";
import slide3 from "@/assets/image/banner/দাওয়াহ-প্রশিক্ষণ-কর্মশালা.png.webp";
import slide4 from "@/assets/image/banner/বয়স্কদের-দোহা-মক্তব.png.webp";
import slide5 from "@/assets/image/courses/running-course.jpg";

const slides = [
  { imageUrl: slide5 },
  { imageUrl: slide5 },
  { imageUrl: slide5 },
  { imageUrl: slide5 },
  { imageUrl: slide5 },
];

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <Banner slides={slides} />
    </div>
  );
};

export default HomePage;
