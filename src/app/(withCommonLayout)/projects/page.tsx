import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { projectsData } from "@/data/projects";

const ProjectPage = () => {
  return (
    <div className="lg:-mt-12 -mt-5 mb-20">
      <Container>
        <Title title="Our Activities" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {projectsData.map((project) => (
            <Card key={project.id} {...project} navigate="projects" />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProjectPage;
