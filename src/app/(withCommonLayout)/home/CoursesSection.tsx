import DohaContainer from "@/components/ui/DohaContainer";
import SubTitle from "@/components/ui/SubTitle";
import Title from "@/components/ui/Title";
import { coursesData } from "@/data/courses";
import { Box, Card, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DohaButton from "@/components/ui/DohaButton";
import { TCourse } from "@/type";

const CoursesSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/courses`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  return (
    <DohaContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Title title="জনপ্রিয় কোর্সসমূহ" />
        <SubTitle title="এক-নজরে দেখে নিন আমাদের বাছাইকৃত কোর্সগুলো" />
      </Stack>

      <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 md:gap-6  gap-5 mt-8 mx-auto">
        {data?.map((course: TCourse) => (
          <Card
            key={course?._id}
            sx={{
              border: "1px solid lightgray",
              borderRadius: "8px",
              ":hover": {
                border: "1px solid #0F473C",
              },
            }}
          >
            <Image
              width={600}
              height={400}
              src={course?.courseImage}
              alt="course image"
              className="border-b border-gray-300"
            />
            <Box
              sx={{
                p: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <CardTitle title={course?.courseName} /> */}
              <Link href={`/courses/${course?.slug}`}>
                <DohaButton btnTitle="রেজিস্টার" />
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </DohaContainer>
  );
};

export default CoursesSection;
