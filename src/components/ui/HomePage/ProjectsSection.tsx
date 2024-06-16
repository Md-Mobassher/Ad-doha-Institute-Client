import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/Container";
import { projectsData } from "@/data/projects";
import DohaButton from "../DohaButton";

const ProjectsSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="আমাদের কার্যক্রম" />
        <DohaButton btnTitle="সকল" navigate="projects" />
      </div>

      <div>
        <Slider
          items={projectsData}
          slidesPerView={3}
          btnTitle="বিস্তারিত"
          navigate="projects"
        />
      </div>
    </Container>
  );
};

export default ProjectsSection;
