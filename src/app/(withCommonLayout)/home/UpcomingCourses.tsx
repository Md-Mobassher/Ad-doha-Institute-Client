import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { Box, Stack } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Courses from "./Courses";

const UpcomingCourses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/offered-courses?status=UPCOMING`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  if (!res.ok) {
    const errorText = await res.text();
    console.error("API error:", errorText);
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();
  // console.log(data);

  const t = await getTranslations("HomePage");

  return (
    <DohaContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Title title={t("upcomingCourseSec.title")} />
        <SubTitle title={t("upcomingCourseSec.subTitle")} />
      </Stack>

      <Box mt={4}>
        <Courses courses={data && data?.map((item: any) => item.course)} />
      </Box>
    </DohaContainer>
  );
};

export default UpcomingCourses;
