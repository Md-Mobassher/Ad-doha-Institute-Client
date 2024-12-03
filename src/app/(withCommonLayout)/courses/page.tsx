import DohaButton from "@/components/ui/DohaButton";
import Container from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { coursesData } from "@/data/courses";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CoursePrice from "./components/CoursePrice";
import { TCourse } from "@/type";

const CoursesPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/courses`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  console.log(data);
  return (
    <>
      <PageTitle title="আমাদের কোর্সসমূহ" />
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <Container>
          <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
            {data &&
              data?.map((course: TCourse) => (
                <Box
                  key={course?._id}
                  sx={{
                    border: "1px solid lightgray",
                    borderRadius: "8px",
                  }}
                >
                  <Box>
                    <Image
                      src={course?.courseImage}
                      alt={course.courseName || "Course Image"}
                      width={500}
                      height={300}
                      className="rounded-t-xl border-b border-gray-300"
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap="5px"
                      flexWrap="wrap"
                      px={2}
                      py={2}
                    >
                      <CoursePrice price={course?.fee?.total} />

                      <Link href={`/courses/${course._id}`}>
                        <DohaButton btnTitle="রেজিস্টার" />
                      </Link>
                    </Stack>
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CoursesPage;
