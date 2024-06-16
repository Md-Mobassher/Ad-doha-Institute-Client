import DohaCard from "@/components/ui/DohaCard";
import PageTitle from "@/components/ui/PageTitle";
import { projectsData } from "@/data/projects";
import { Container } from "@mui/material";

const ProjectPage = () => {
  return (
    <>
      <PageTitle title="আমাদের কার্যক্রম সমূহ" />
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          {projectsData.map((project) => (
            <DohaCard
              key={project.id}
              {...project}
              navigate="projects"
              btnTitle="বিস্তারিত"
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectPage;
