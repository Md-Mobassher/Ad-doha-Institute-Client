import ProjectDetails from "@/components/ui/Projects/ProjectDetails";
import Title from "@/components/ui/Title";
import { projectsData } from "@/data/projects";
import { TProject } from "@/type";

type TParamsProps = {
  params: {
    projectId: string;
  };
};

const ProjectDetailsPage = ({ params }: TParamsProps) => {
  const projectData = projectsData.find(
    (project) => project.id === params.projectId
  );

  return (
    <div className="mt-8">
      {projectData ? (
        <>
          <ProjectDetails {...projectData} />
        </>
      ) : (
        <p>No Project Found</p>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
