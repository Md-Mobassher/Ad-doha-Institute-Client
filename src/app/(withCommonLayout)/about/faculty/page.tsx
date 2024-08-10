import DohaContainer from "@/components/ui/DohaContainer";
import Member from "@/components/ui/Member";
import Title from "@/components/ui/Title";
import { facultyData, facultyPageTitle } from "@/data/faculties";
import { Box } from "@mui/material";

const FacultyPage = () => {
  return (
    <>
      <Box>
        <Box
          sx={{ textAlign: "center", py: "40px", backgroundColor: "info.main" }}
        >
          <Title title={facultyPageTitle} />
        </Box>

        <DohaContainer>
          <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
            {facultyData &&
              facultyData?.map((faculty) => (
                <Member
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
