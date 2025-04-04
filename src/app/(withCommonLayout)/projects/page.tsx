import DohaCard from "@/components/ui/DohaCard";
import PageTitle from "@/components/ui/PageTitle";
import { Container } from "@mui/material";
import { useTranslations } from "next-intl";

const ProjectPage = () => {
  const t = useTranslations("HomePage");
  const translatedProjects = t.raw("projectSec.projectsData") as any[];

  return (
    <>
      <PageTitle title={t("projectSec.title")} />
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          {translatedProjects?.map((project) => (
            <DohaCard
              key={project._id}
              {...project}
              navigate="projects"
              btnTitle={t("projectSec.btnTitle")}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectPage;
