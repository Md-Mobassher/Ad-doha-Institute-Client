import DohaContainer from "@/components/ui/DohaContainer";
import Member from "@/components/ui/Member";
import { facultyData, facultyPageTitle } from "@/data/faculties";
import { Box, Typography } from "@mui/material";

const FacultyPage = () => {
  return (
    <DohaContainer>
      <Box my={2}>
        <Typography
          component="h2"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "primary.main",
            textAlign: "center",
          }}
        >
          {facultyPageTitle}
        </Typography>
      </Box>
      <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
        {facultyData &&
          facultyData.map((member) => (
            <Member
              key={member.id}
              {...member}
              navigate={`/about/faculty/${member.id}`}
            />
          ))}
      </Box>
    </DohaContainer>
  );
};

export default FacultyPage;
