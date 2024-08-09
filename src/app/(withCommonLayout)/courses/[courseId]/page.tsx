import { coursesData } from "@/data/courses";
import { TCourse } from "@/type/course";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Title from "@/components/ui/Title";
import DohaContainer from "@/components/ui/DohaContainer";
import Details from "@/components/ui/Details";
import CardTitle from "@/components/ui/CardTitle";
import DetailsItem from "@/components/ui/DetailsItem";

type TParamsProps = {
  params: {
    courseId: string;
  };
};

const courseDetailsPage = ({ params }: TParamsProps) => {
  const courseData: TCourse | undefined = coursesData?.find(
    (course) => course?.navigation === params?.courseId
  );

  if (!courseData) {
    return <p>No Service Found</p>;
  }

  const {
    _id,
    courseName,
    classDuration,
    contact,
    courseImage,
    description,
    duration,
    fee,
    medium,
    navigation,
    schedule,
    totalClasses,
    modules,
    objectives,
    outcomes,
    targetAudience,
    topics,
  } = courseData;

  return (
    <Box>
      <DohaContainer>
        <Title title={courseName} />
        <Stack
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems="center"
          gap={4}
          mt={4}
        >
          <Box
            width="100%"
            sx={{
              borderRight: {
                lg: "1px solid lightgray",
                md: "1px solid lightgray",
                sm: "0px solid lightgray",
                xs: "0px solid lightgray",
              },
              borderBottom: {
                lg: "0px solid lightgray",
                md: "0px solid lightgray",
                sm: "1px solid lightgray",
                xs: "1px solid lightgray",
              },
            }}
          >
            <Image
              src={courseImage}
              alt={courseName || "course Name"}
              width={600}
              height={400}
            />
          </Box>
          <Box width="100%">
            <Details details={`কোর্স মাধ্যমঃ ${medium} `} />
            <Details details={`সর্বমোট ক্লাসঃ ${totalClasses} টি`} />
            <Details details={`কোর্স ব্যপ্তিঃ ${duration}`} />
            <Details details={`ক্লাসের সময়ঃ ${schedule}`} />
            <Details details={`ক্লাস ডিউরেশনঃ ${classDuration}`} />
            <Details details={`কোর্স ফিঃ ${fee?.total} টাকা`} />
            <Details
              details={`ভর্তি ফিঃ ${fee?.admission} টাকা, মাসিক ফিঃ ${fee.monthly}`}
            />
            <Details details={`যোগাযোগঃ ${contact}`} />
          </Box>
        </Stack>

        {description && (
          <Box pt={5}>
            <CardTitle title="কোর্স পরিচিতি " />
            <Box maxWidth={800} mx="auto">
              <Details details={description} />
            </Box>
          </Box>
        )}

        {topics && (
          <Box py={5}>
            <Box pb={2}>
              <CardTitle title="কোর্সের বিষয়বস্তু" />
            </Box>{" "}
            <Box maxWidth={800} mx="auto">
              {topics?.map((item, index) => (
                <DetailsItem key={index} index={index} item={item} />
              ))}
            </Box>
          </Box>
        )}

        {objectives && (
          <Box py={5}>
            <Box pb={2}>
              <CardTitle title="কোর্সের উদ্দেশ্য" />
            </Box>{" "}
            <Box maxWidth={800} mx="auto">
              {objectives?.map((item, index) => (
                <DetailsItem key={index} index={index} item={item} />
              ))}
            </Box>
          </Box>
        )}

        {outcomes && (
          <Box py={5}>
            <Box pb={2}>
              <CardTitle title="কোর্স থেকে যা অর্জন হবে " />
            </Box>
            <Box maxWidth={800} mx="auto">
              {outcomes?.map((item, index) => (
                <DetailsItem key={index} index={index} item={item} />
              ))}
            </Box>
          </Box>
        )}

        {targetAudience && (
          <Box py={5}>
            <Box pb={2}>
              <CardTitle title="এই কোর্সটি কাদের জন্য" />
            </Box>
            <Box maxWidth={800} mx="auto">
              {targetAudience?.map((item, index) => (
                <DetailsItem key={index} index={index} item={item} />
              ))}
            </Box>
          </Box>
        )}
        {modules && (
          <Box py={5}>
            <Box pb={2}>
              <CardTitle title="কোর্স মডিউল " />
            </Box>
            <Box maxWidth={800} mx="auto">
              {modules?.map((item, index) => (
                <DetailsItem key={index} index={index} item={item} />
              ))}
            </Box>
          </Box>
        )}
      </DohaContainer>
    </Box>
  );
};

export default courseDetailsPage;
