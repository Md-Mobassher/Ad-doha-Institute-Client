import { Box } from "@mui/material";
import BannerSection from "./home/BannerSection";
import AboutSection from "./home/AboutSection";
import ProjectsSection from "./home/ProjectsSection";
import CoursesSection from "./home/CoursesSection";
import DepartmentsSection from "./home/DepartmentsSection";
// import StudentsCornerSection from "./home/StudentsCorner";
import OpinionOfAlim from "./home/OpinionOfAlim";
import TeachersPanel from "./home/TeachersPanel";
import VideosSection from "./home/VideosSection";
import EPathagar from "./home/EPathagar";
import PreOrderBooks from "./home/PreOrderBooks";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  const title = messages?.HomePage?.metaTitle;
  const metaKeywords = messages?.HomePage?.metaKeywords;
  const description = messages?.HomePage?.metaDescription;

  return {
    title,
    metaKeywords,
    description,
  };
}

const HomePage = () => {
  return (
    <Box>
      <BannerSection />
      <AboutSection />
      <ProjectsSection />
      <CoursesSection />
      <DepartmentsSection />
      <EPathagar />
      <PreOrderBooks />
      {/* <StudentsCornerSection /> */}
      <OpinionOfAlim />
      <TeachersPanel />
      <VideosSection />
    </Box>
  );
};

export default HomePage;
