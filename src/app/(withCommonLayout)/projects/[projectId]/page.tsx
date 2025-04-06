import CardDetails from "@/components/ui/CardDetails";
import { useTranslations } from "next-intl";
import { use } from "react";

type TParamsProps = {
  params: Promise<{
    projectId: string;
  }>;
};

const ProjectDetailsPage = ({ params }: TParamsProps) => {
  const t = useTranslations("HomePage");
  const translatedProjects = t.raw("projectSec.projectsData") as any[];

  const unwrappedParams = use(params);
  const projectData = translatedProjects.find(
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
