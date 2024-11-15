import DohaContainer from "@/components/ui/DohaContainer";
import FacultyMember from "@/components/ui/FacultyMember";
import PageTitle from "@/components/ui/PageTitle";
import { facultyData, facultyPageTitle } from "@/data/faculties";
import { TTeacher } from "@/type";
import { Box } from "@mui/material";

const FacultyPage = async () => {
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
        <PageTitle title={facultyPageTitle} />

        <DohaContainer>
          <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
            {teachers &&
              teachers?.map((faculty) => (
                <FacultyMember
                  key={faculty._id}
                  {...faculty}
                  navigate={`/about/faculty/${faculty._id}`}
                />
              ))}
          </Box>
        </DohaContainer>
      </Box>
    </>
  );
};

export default FacultyPage;
