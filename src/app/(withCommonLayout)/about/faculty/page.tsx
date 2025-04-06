import DohaContainer from "@/components/ui/DohaContainer";
import FacultyCard from "@/components/ui/FacultyCard";
import PageTitle from "@/components/ui/PageTitle";
import { TTeacher } from "@/type";
import { Box } from "@mui/material";
import { getTranslations } from "next-intl/server";

const FacultyPage = async () => {
  const t = await getTranslations("AboutPage");

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
    <>
      <Box>
        <PageTitle title={t("faculty.title")} />

        <DohaContainer>
          <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
            {teachers &&
              teachers?.map((faculty) => (
                <FacultyCard key={faculty._id} member={faculty} />
              ))}
          </Box>
        </DohaContainer>
      </Box>
    </>
  );
};

export default FacultyPage;
