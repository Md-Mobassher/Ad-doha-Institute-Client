import Card from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import dawah from "@/assets/image/projects/dawah.png";
import service from "@/assets/image/projects/services.jpg";
import education from "@/assets/image/projects/education.jpg";
import Slider from "@/components/ui/Slider";
import { SwiperSlide } from "swiper/react";
const projects = [
  {
    id: "1",
    title: "Dawah",
    image: "@/assets/image/projects/dawah.png",
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "2",
    title: "Service",
    image: service,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "3",
    title: "Education",
    image: education,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "4",
    title: "Education",
    image: education,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "5",
    title: "Education",
    image: education,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "6",
    title: "Education",
    image: education,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
];

const Activities = () => {
  return (
    <div>
      <Title title="Our Activities" />
      <div>
        <Slider items={projects} slidesPerView={3} />
      </div>
    </div>
  );
};

export default Activities;
