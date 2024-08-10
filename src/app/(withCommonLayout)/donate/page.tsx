import Details from "@/components/ui/Details";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import Title from "@/components/ui/Title";
import { Box, Stack, Typography } from "@mui/material";

const DonatePage = () => {
  return (
    <Box>
      <PageTitle title="ডোনেশন" />

      {/* Into */}
      <DohaContainer>
        {/* <Details
          details="আদ-দোহা ইনস্টিটিউট দাওয়াহ, শিক্ষা ও সেবাসহ বিভিন্ন সামাজিক কার্যক্রম
          পরিচালনা করে থাকে। তার জন্য ব্যাপক অর্থের প্রয়োজন হয়। শুধু মাত্র
          শিক্ষা ফিল্ড থেকে শিক্ষার্থীদের গুরুত্বের জন্য নামমাত্র ফী নেওয়া হয়;
          যা আমাদের অন্যান্য কার্যক্রম পরিচালনার জন্য যথেষ্ট নয়। ফলে আমাদের
          কার্যক্রমগুলো সুষ্ঠুভাবে পরিচালনা করা দুরূহ হয়ে ওঠে।"
        /> */}
        <Typography
          component="p"
          sx={{
            fontSize: {
              xl: "18px",
              lg: "18px",
              md: "18px",
              sm: "17px",
              xs: "16px",
            },
            fontWeight: "400",
            textAlign: "justify",
          }}
        >
          আদ-দোহা ইনস্টিটিউট দাওয়াহ, শিক্ষা ও সেবাসহ বিভিন্ন সামাজিক কার্যক্রম
          পরিচালনা করে থাকে। তার জন্য ব্যাপক অর্থের প্রয়োজন হয়। শুধু মাত্র
          শিক্ষা ফিল্ড থেকে শিক্ষার্থীদের গুরুত্বের জন্য নামমাত্র ফী নেওয়া হয়;
          যা আমাদের অন্যান্য কার্যক্রম পরিচালনার জন্য যথেষ্ট নয়। ফলে আমাদের
          কার্যক্রমগুলো সুষ্ঠুভাবে পরিচালনা করা দুরূহ হয়ে ওঠে।
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: {
              xl: "18px",
              lg: "18px",
              md: "18px",
              sm: "17px",
              xs: "16px",
            },
            fontWeight: "400",
            mt: "20px",
            textAlign: "justify",
          }}
        >
          আমাদের শিক্ষা কার্যক্রম বাস্তবায়ন, শিক্ষার্থীদের চাহিদা পূরণ, দাওয়াহ,
          প্রকাশনা, সেবা ইত্যাদি নানা খাতে অনেক অর্থের প্রয়োজন হয়। আমাদের
          কার্যক্রমগুলোকে বেগবান করে গড়ে তুলতে এবং এগিয়ে নিতে আপনাদের আন্তরিক
          সহযোগিতা খুবই জরুরী। সম্মিলিত সহযোগিতার মাধ্যমে আমরা আমাদের লক্ষ্যে
          পৌঁছতে পারব ইনশাআল্লাহ। অতএব, দানশীল দ্বীনী ভাইদের প্রতি উদাত্ত
          আহ্বান- আপনারা এই গুরুত্বপূর্ণ দ্বীনী কাজ এগিয়ে নিতে সাধ্যের সর্বোচ্চ
          সহযোগিতা দিয়ে ইনস্টিটিউট -এর কল্যাণে এগিয়ে আসবেন। মহান আল্লাহর
          সন্তুষ্টির উদ্দেশ্যে দান-সদাকায়ে জারিয়াসহ (এককালীন, মাসিক, বাৎসরিক)
          যেকোনো মাধ্যমে ইনস্টিটিউটকে সহযোগিতা করবেন বলে আমরা আশাবাদী। মহান
          আল্লাহ কবুল করুন। সকলকে উত্তম প্রতিদান দান করুন। আমীন!
        </Typography>
      </DohaContainer>

      {/* number */}

      <DohaContainer>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={{ lg: "30px", md: "30px", sm: "20px", xs: "15px" }}
          flexWrap="wrap"
        >
          <Title title="দান-সদাকাহ পাঠানোর মাধ্যম " />
          <Typography
            component="p"
            sx={{
              fontSize: {
                xl: "20px",
                lg: "20px",
                md: "18px",
                sm: "18px",
                xs: "16px",
              },
              fontWeight: "600",
              textAlign: "center",
              color: "warning.main",
            }}
          >
            নগদ / বিকাশ : +8801916-016099
          </Typography>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default DonatePage;
