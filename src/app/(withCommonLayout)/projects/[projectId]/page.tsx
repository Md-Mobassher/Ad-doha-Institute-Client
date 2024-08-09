import CardDetails from "@/components/ui/CardDetails";
import { projectsData } from "@/data/projects";

type TParamsProps = {
  params: {
    projectId: string;
  };
};

const ProjectDetailsPage = ({ params }: TParamsProps) => {
  const projectData = projectsData.find(
    (project) => project._id === params.projectId
  );

  return (
    <div className="">
      {projectData ? (
        <>
          <CardDetails {...projectData} />
        </>
      ) : (
        <p>No Project Found</p>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
