import DohaContainer from "@/components/ui/DohaContainer";
import FacultyMember from "@/components/ui/FacultyMember";
import PageTitle from "@/components/ui/PageTitle";
import { facultyData, facultyPageTitle } from "@/data/faculties";
import { Box } from "@mui/material";

const FacultyPage = () => {
  return (
    <>
      <Box>
        <PageTitle title={facultyPageTitle} />

        <DohaContainer>
          <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
            {facultyData &&
              facultyData?.map((faculty) => (
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
