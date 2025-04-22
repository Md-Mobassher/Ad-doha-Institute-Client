import { Box } from "@mui/material";
import BannerSection from "./home/BannerSection";
import AboutSection from "./home/AboutSection";
import ProjectsSection from "./home/ProjectsSection";
import PopularCoursesSection from "./home/PopularCoursesSection";
import DepartmentsSection from "./home/DepartmentsSection";
// import StudentsCornerSection from "./home/StudentsCorner";
import OpinionOfAlim from "./home/OpinionOfAlim";
import TeachersPanel from "./home/TeachersPanel";
import VideosSection from "./home/VideosSection";
import EPathagar from "./home/EPathagar";
import PreOrderBooks from "./home/PreOrderBooks";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import UpcomingCourses from "./home/UpcomingCourses";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.HomePage?.metaTitle;
  const description = messages?.HomePage?.metaDescription;

  return {
    title,
    description,
  };
}

const HomePage = async () => {
  return (
    <Box>
      <BannerSection />
      <AboutSection />
      <ProjectsSection />
      <UpcomingCourses />
      <PopularCoursesSection />
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
