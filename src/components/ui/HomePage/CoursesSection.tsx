import Title from "@/components/ui/Title";
import Container from "../DohaContainer";
import { coursesData } from "@/data/courses";
import DohaCard from "../DohaCard";
import DohaButton from "../DohaButton";
import { Box, Stack } from "@mui/material";

const CoursesSection = () => {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="আমাদের কোর্সসমূহ" />
        <DohaButton btnTitle="সকল" navigate="courses" />
      </Stack>

      <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 gap-5 mt-8">
        {coursesData.map((course) => (
          <DohaCard key={course.id} {...course} />
        ))}
      </Box>
    </Container>
  );
};

export default CoursesSection;
