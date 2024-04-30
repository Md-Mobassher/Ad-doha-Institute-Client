import Title from "@/components/ui/Title";
import dawah from "@/assets/images/projects/dawah.png";
import service from "@/assets/images/projects/services.jpg";
import education from "@/assets/images/projects/education.jpg";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";

const courses = [
  {
    id: "1",
    title: "Dawah",
    image: dawah,
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
];

const Courses = () => {
  return (
    <div className="lg:mt-20 md:mt-16 mt-10 lg:mb-8 md:mb-8 mb-6">
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="Our Courses" />
        <Button title="View All " />
      </div>

      <div>
        <Slider items={courses} slidesPerView={4} />
      </div>
    </div>
  );
};

export default Courses;
