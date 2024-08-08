import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { coursesData } from "@/data/courses";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";

const CoursesSection = () => {
  return (
    <DohaContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Title title="জনপ্রিয় কোর্সসমূহ" />
        <SubTitle title="এক-নজরে দেখে নিন আমাদের বাছাইকৃত সেরা কোর্সগুলো" />
      </Stack>

      <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 gap-5 mt-8 mx-auto">
        {coursesData.map((course) => (
          <Card
            key={course?.id}
            sx={{
              maxWidth: 345,
              border: "1px solid lightgray",
            }}
          >
            <Image width={300} src={course?.image} alt="course image" />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  textAlign: "center",
                  mt: "5px",
                }}
              >
                {course?.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DohaContainer>
  );
};

export default CoursesSection;
