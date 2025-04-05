import { Box, Stack } from "@mui/material";
import Teachers from "./Teachers";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import { TTeacher } from "@/type";
import { getTranslations } from "next-intl/server";

const TeachersPanel = async () => {
  const t = await getTranslations("HomePage");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teachers`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  // console.log(data);
  const teachers = (data as TTeacher[]) || [];

  return (
    <Box sx={{ backgroundColor: "info.main" }}>
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title={t("teachersSec.title")} />
        </Stack>

        <Teachers teachers={teachers} />
      </DohaContainer>
    </Box>
  );
};

export default TeachersPanel;
