import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { projectsData } from "@/data/projects";

const Projects = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="Our Projects" />
        <Button title="View All " navigate="projects" />
      </div>

      <div>
        <Slider items={projectsData} slidesPerView={3} />
      </div>
    </Container>
  );
};

export default Projects;
