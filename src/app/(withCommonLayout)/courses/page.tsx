import DohaCard from "@/components/ui/DohaCard";
import Container from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { coursesData } from "@/data/courses";
import { Box } from "@mui/material";

const CoursesPage = () => {
  return (
    <>
      <PageTitle title="Our Courses" />
      <Box className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <Box className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
            {coursesData?.map((course) => (
              <DohaCard
                key={course.id}
                {...course}
                navigate="courses"
                // btnTitle="Details"
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CoursesPage;
