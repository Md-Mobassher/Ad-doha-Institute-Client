import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { Box, Stack } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Courses from "./Courses";

const PopularCoursesSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/courses`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();

  const t = await getTranslations("HomePage");

  return (
    <DohaContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Title title={t("popularCourseSec.title")} />
        <SubTitle title={t("popularCourseSec.subTitle")} />
      </Stack>

      <Box mt={4}>
        <Courses courses={data} />
      </Box>
    </DohaContainer>
  );
};

export default PopularCoursesSection;
