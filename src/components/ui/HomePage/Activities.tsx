import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import assets from "@/assets";

const projects = [
  {
    id: "1",
    title: "Dawah",
    image: assets.projects.dawah,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },

  {
    id: "2",
    title: "Education",
    image: assets.projects.education,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
  {
    id: "3",
    title: "Service",
    image: assets.projects.services,
    details:
      "To convey the good message of Islam and the message of world peace to every non-Muslim living in Bangladesh.",
  },
];

const Activities = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="Our Activities" />
        <Button title="View All " />
      </div>

      <div>
        <Slider items={projects} slidesPerView={3} />
      </div>
    </Container>
  );
};

export default Activities;
