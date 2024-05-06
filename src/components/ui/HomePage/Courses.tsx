import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import { assets } from "@/assets";

const courses = [
  {
    id: "1",
    title: "Dawah",
    image: assets.banner.dawah,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "2",
    title: "Service",
    image: assets.banner.dawah,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "3",
    title: "Education",
    image: assets.banner.dawah,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "4",
    title: "Education",
    image: assets.banner.dawah,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
];

const Courses = () => {
  return (
    <div className="lg:mt-20 md:mt-16 mt-10 lg:mb-8 md:mb-8 mb-6">
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="Our Courses" />
        <Button title="View All " navigate="courses" />
      </div>

      <div>
        <Slider
          items={courses}
          slidesPerView={4}
          btnTitle="Course Details"
          navigate="courses"
        />
      </div>
    </div>
  );
};

export default Courses;
