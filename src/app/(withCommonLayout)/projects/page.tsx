import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import Title from "@/components/ui/Title";
import { projectsData } from "@/data/projects";

const ProjectPage = () => {
  return (
    <>
      <PageTitle title="আমাদের কার্যক্রম সমূহ" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
            {projectsData.map((project) => (
              <Card
                key={project.id}
                {...project}
                navigate="projects"
                btnTitle="বিস্তারিত"
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProjectPage;
