import CardTitle from "@/components/ui/CardTitle";
import Details from "@/components/ui/Details";
import Container from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { coursesData } from "@/data/courses";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <>
      <PageTitle title="আমাদের কোর্সসমূহ" />
      <Box sx={{ textAlign: "center", backgroundColor: "info.main" }}>
        <Container>
          <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
            {coursesData?.map((course) => (
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
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <Box pt={2}>
                    <CardTitle title={course?.courseName} />
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="5px"
                    flexWrap="wrap"
                    px={2}
                    py={1}
                  >
                    <Details
                      details={`সর্বমোট ক্লাসঃ ${course?.totalClasses} টি`}
                    />
                    <Details details={`কোর্স ব্যপ্তিঃ ${course?.duration}`} />

                    <Details details={`কোর্স ফিঃ ${course?.fee?.total} টাকা`} />
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="15px"
                    px={2}
                    pb={2}
                  >
                    <Link href={`/courses/${course?.navigation}`}>
                      <Button>বিস্তারিত</Button>
                    </Link>
                    <Link href={`/courses/${course._id}`}>
                      <Button>এনরোল</Button>
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
