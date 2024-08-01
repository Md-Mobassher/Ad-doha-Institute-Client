import Title from "@/components/ui/Title";
import Container from "../DohaContainer";
import { coursesData } from "@/data/courses";
import DohaCard from "../DohaCard";
import { Box, Stack, Typography } from "@mui/material";

const CoursesSection = () => {
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Title title="জনপ্রিয় কোর্সসমূহ" />
        <Typography
          component="h3"
          sx={{
            fontSize: {
              lg: "23px",
              md: "22px",
              sm: "20px",
              xs: "18px",
            },
            pt: "10px",
            fontWeight: "600",
            color: "warning.main",
          }}
        >
          এক-নজরে দেখে নিন আমাদের বাছাইকৃত সেরা কোর্সগুলো
        </Typography>
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
