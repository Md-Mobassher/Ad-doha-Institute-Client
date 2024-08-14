import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { coursesData } from "@/data/courses";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CardTitle from "@/components/ui/CardTitle";
import Link from "next/link";

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

      <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 md:gap-6  gap-5 mt-8 mx-auto">
        {coursesData.map((course) => (
          <Card
            component={Link}
            key={course?._id}
            href={`/courses/${course.navigation}`}
            sx={{
              border: "1px solid lightgray",
              borderRadius: "8px",
              ":hover": {
                border: "1px solid #0F473C",
              },
            }}
          >
            <Image
              width={300}
              src={course?.courseImage}
              alt="course image"
              className="border-b border-gray-300"
            />
            <Box sx={{ p: "20px" }}>
              <CardTitle title={course?.courseName} />
            </Box>
          </Card>
        ))}
      </Box>
    </DohaContainer>
  );
};

export default CoursesSection;
