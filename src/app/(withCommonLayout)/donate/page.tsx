import donation from "@/assets/donation/dan.jpg";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import Title from "@/components/ui/Title";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CourseTitle2 from "../courses/components/CourseTitle2";
import DonateTitle from "@/components/ui/DonateTitle";

const DonatePage = () => {
  return (
    <Box>
      <PageTitle title="ডোনেশন" />

      {/* Into */}
      <DohaContainer>
        <Stack
          mt={3}
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems="center"
          gap={{
            lg: 8,
            md: 6,
            sm: 5,
            xs: 4,
          }}
        >
          <Box
            width="100%"
            sx={{
              borderRadius: "10px",
            }}
          >
            <Image
              src={donation}
              alt={"aim"}
              width={900}
              height={400}
              className="rounded-lg "
            />
          </Box>
          <Stack width="100%" gap={5}>
            <CourseTitle2
              details={
                "আদ-দোহা ইনস্টিটিউট দাওয়াহ, শিক্ষা ও সেবাসহ বিভিন্ন সামাজিক কার্যক্রম পরিচালনা করে থাকে। তার জন্য ব্যাপক অর্থের প্রয়োজন হয়। শুধু মাত্র শিক্ষা ফিল্ড থেকে শিক্ষার্থীদের গুরুত্বের জন্য নামমাত্র ফী নেওয়া হয়; যা আমাদের অন্যান্য কার্যক্রম পরিচালনার জন্য যথেষ্ট নয়। ফলে আমাদের কার্যক্রমগুলো সুষ্ঠুভাবে পরিচালনা করা দুরূহ হয়ে ওঠে।"
              }
            />
            <CourseTitle2
              details={
                " আমাদের শিক্ষা কার্যক্রম বাস্তবায়ন, শিক্ষার্থীদের চাহিদা পূরণ, দাওয়াহ,  প্রকাশনা, সেবা ইত্যাদি নানা খাতে অনেক অর্থের প্রয়োজন হয়। আমাদের   কার্যক্রমগুলোকে বেগবান করে গড়ে তুলতে এবং এগিয়ে নিতে আপনাদের আন্তরিক  সহযোগিতা খুবই জরুরী। সম্মিলিত সহযোগিতার মাধ্যমে আমরা আমাদের লক্ষ্যে পৌঁছতে পারব ইনশাআল্লাহ। অতএব, দানশীল দ্বীনী ভাইদের প্রতি উদাত্ত  আহ্বান- আপনারা এই গুরুত্বপূর্ণ দ্বীনী কাজ এগিয়ে নিতে সাধ্যের সর্বোচ্চ সহযোগিতা দিয়ে ইনস্টিটিউট -এর কল্যাণে এগিয়ে আসবেন। মহান আল্লাহর সন্তুষ্টির উদ্দেশ্যে দান-সদাকায়ে জারিয়াসহ (এককালীন, মাসিক, বাৎসরিক) যেকোনো মাধ্যমে ইনস্টিটিউটকে সহযোগিতা করবেন বলে আমরা আশাবাদী। মহান আল্লাহ কবুল করুন। সকলকে উত্তম প্রতিদান দান করুন। আমীন!"
              }
            />
          </Stack>
        </Stack>

        <Box mt={{ lg: 12, md: 10, sm: 8, xs: 6 }}>
          <Title title="দান-সদাকাহ পাঠানোর মাধ্যম " />
        </Box>
        <Stack
          maxWidth={{ lg: "80%", md: "100%", sm: "100%", xs: "100%" }}
          direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          justifyContent="space-between"
          alignItems="start"
          gap={{ lg: "30px", md: "30px", sm: "20px", xs: "20px" }}
          mt={{ lg: 6, md: 6, sm: 4, xs: 3 }}
          mx={"auto"}
        >
          <Box width={"100%"}>
            <DonateTitle title="Account No:" details="20502670203230516" />
            <DonateTitle title="Account Name:" details="AD DOHA INSTITUTE" />
            <DonateTitle title="Routing Number:" details="125263377" />
            <Typography
              component="p"
              mt={"4px"}
              sx={{
                fontSize: {
                  xl: "19px",
                  lg: "18px",
                  md: "17px",
                  sm: "16px",
                  xs: "15px",
                },
                fontWeight: "600",
                color: "warning.main",
              }}
            >
              Islami bank Bangladesh limited Mohammadpur Krishi
              Market Branch, Dhaka.
            </Typography>
          </Box>
          <Box width={"100%"}>
            <DonateTitle title="BKASH / NAGAD:" details="+8801916-016099" />
          </Box>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default DonatePage;
