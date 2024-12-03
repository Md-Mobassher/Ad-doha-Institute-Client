import CardDetails from "@/components/ui/CardDetails";
import { projectsData } from "@/data/projects";
import { use } from "react";

type TParamsProps = {
  params: Promise<{
    projectId: string;
  }>;
};

const ProjectDetailsPage = ({ params }: TParamsProps) => {
  const unwrappedParams = use(params);
  const projectData = projectsData.find(
    (project) => project?.navigation === unwrappedParams?.projectId
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
