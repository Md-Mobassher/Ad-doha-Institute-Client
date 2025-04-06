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
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.HomePage?.metaTitle;
  const description = messages?.HomePage?.metaDescription;

  return {
    title,
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
