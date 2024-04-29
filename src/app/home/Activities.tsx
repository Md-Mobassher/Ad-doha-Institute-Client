import Title from "@/components/ui/Title";
import dawah from "@/assets/image/projects/dawah.png";
import service from "@/assets/image/projects/services.jpg";
import education from "@/assets/image/projects/education.jpg";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const projects = [
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

const Activities = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="Our Activities" />
        <Button title="View All " />
      </div>

      <div>
        <Slider items={projects} slidesPerView={5} />
      </div>
    </Container>
  );
};

export default Activities;
