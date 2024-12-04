"use client";
import { TCourse } from "@/type/course";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import CourseTitle from "../components/CourseTitle";
import CoursePrice from "../components/CoursePrice";
import CourseTitle2 from "../components/CourseTitle2";
import CourseTitle3 from "../components/CourseTitle3";
import Link from "next/link";
import { use } from "react";
import { useGetSingleCourseQuery } from "@/redux/features/admin/courseManagementApi";

type TParamsProps = {
  params: Promise<{
    courseId: string;
  }>;
};

const CourseDetailsPage = ({ params }: TParamsProps) => {
  const unwrappedParams = use(params);

  const { data, isLoading, refetch } = useGetSingleCourseQuery(
    unwrappedParams?.courseId
  );

  const courseData = (data as TCourse) || {};

  if (!courseData) {
    return <p>No Service Found</p>;
  }

  const {
    _id,
    courseName,
    classDuration,
    contact,
    courseImage,
    courseDescription,
    courseDuration,
    fee,
    feePaymentMethod,
    medium,
    schedule,
    totalClasses,
  } = courseData;

  return (
    <Box>
      <PageTitle title={courseName} />

      <DohaContainer>
        <Stack
          direction={{
            lg: "row-reverse",
            md: "row-reverse",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems="start"
          gap={5}
        >
          <Box
            width="100%"
            sx={{
              border: {
                lg: "1px solid lightgray",
                md: "1px solid lightgray",
                sm: "1px solid lightgray",
                xs: "1px solid lightgray",
              },
              borderRadius: "10px",
            }}
          >
            {courseImage && (
              <Image
                src={courseImage}
                alt={courseName || "course Name"}
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
              />
            )}
          </Box>
          <Box width="100%">
            <CourseTitle title={courseName} />
            <Box mt={0} mb={2}>
              <CourseTitle3 />
            </Box>
            <Box mt={0} mb={1}>
              <CoursePrice price={fee?.total} />
            </Box>
            <CourseTitle2 title="ভর্তির শেষ তারিখ:" />
            <CourseTitle2 title="কোর্স মাধ্যম:" details={medium} />
            <CourseTitle2 title="ওরিয়েন্টেশন প্রোগ্রাম:" />
            <CourseTitle2 title="ক্লাস শুরু:" />
            <CourseTitle2 title="সর্বমোট ক্লাস:" details={totalClasses} />
            <CourseTitle2 title="কোর্স ব্যপ্তি:" details={courseDuration} />
            <CourseTitle2 title="ক্লাসের সময়:" details={classDuration} />
            <CourseTitle2 title="যোগাযোগ:" details2={contact} />

            <Box mt={3} mb={2}>
              <CourseTitle3 title="পেমেন্ট পদ্ধতি" />
            </Box>
            <CourseTitle2
              title="রেজিস্ট্রেশন ফি:"
              details={`${fee?.admission} টাকা`}
            />
            <CourseTitle2 title="মাসিক ফি:" details={`${fee?.monthly} টাকা`} />
            <CourseTitle2 title="সর্বমোট:" details2={`${fee?.total} টাকা`} />
            <CourseTitle2 title="ফি পরিশোধের ধরন:" />
            <CourseTitle2 details={feePaymentMethod} />

            <Button
              sx={{
                mt: "25px",
                borderRadius: "10px",
                backgroundColor: "primary.main",
                color: "secondary.main",
                width: "100%",
                textSizeAdjust: "auto",
                ":hover": {
                  backgroundColor: "success.main",
                  color: "primary.main",
                },
                fontSize: {
                  lg: "16px",
                  md: "16px",
                  sm: "16px",
                  xs: "15px",
                },
                fontWeight: 600,
              }}
            >
              আমাদের কোর্সে জয়েন করুন
            </Button>

            <Link href={"/"}></Link>
          </Box>
        </Stack>
      </DohaContainer>

      {/* {description && (
        <Box
          sx={{
            backgroundColor: "info.main",
          }}
        >
          <DohaContainer>
            <CardTitle title="কোর্স পরিচিতি " />
            <CourseTitle2 details={description} />
          </DohaContainer>
        </Box>
      )}

      {topics && (
        <DohaContainer>
          <Box pb={2}>
            <CardTitle title="কোর্সের বিষয়বস্তু" />
          </Box>
          <Box maxWidth={800} mx="auto">
            {topics?.map((item, index) => (
              <CourseDetailsItem key={index} item={item} />
            ))}
          </Box>
        </DohaContainer>
      )}

      {objectives && (
        <Box>
          <DohaContainer>
            <CardTitle title="কোর্সের উদ্দেশ্য" />

            <Box maxWidth={800} mx="auto" mt={2}>
              {objectives?.map((item, index) => (
                <CourseDetailsItem key={index} item={item} />
              ))}
            </Box>
          </DohaContainer>
        </Box>
      )}

      {outcomes && (
        <Box
          sx={{
            backgroundColor: "info.main",
          }}
        >
          <DohaContainer>
            <CardTitle title="কোর্স থেকে যা অর্জন হবে " />

            <Box maxWidth={800} mx="auto" mt={2}>
              {outcomes?.map((item, index) => (
                <CourseDetailsItem key={index} item={item} />
              ))}
            </Box>
          </DohaContainer>
        </Box>
      )}

      {targetAudience && (
        <Box
          sx={{
            backgroundColor: "info.main",
          }}
        >
          <DohaContainer>
            <CardTitle title="এই কোর্সটি কাদের জন্য" />
            <Box maxWidth={800} mx="auto" mt={2}>
              {targetAudience?.map((item, index) => (
                <CourseDetailsItem key={index} item={item} />
              ))}
            </Box>
          </DohaContainer>
        </Box>
      )}
      {modules && (
        <Box py={5}>
          <Box pb={2}>
            <CardTitle title="কোর্স মডিউল " />
          </Box>
          <Box maxWidth={800} mx="auto">
            {modules?.map((item, index) => (
              <CourseDetailsItem key={index} item={item} />
            ))}
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default CourseDetailsPage;
