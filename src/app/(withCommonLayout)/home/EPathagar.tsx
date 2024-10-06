import DohaContainer from "@/components/ui/DohaContainer";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import CourseTitle3 from "../courses/components/CourseTitle3";
import Link from "next/link";
import Title from "@/components/ui/Title";
import assets from "@/assets";
import Details from "@/components/ui/Details";

const EPathagar = () => {
  return (
    <Box>
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
          gap={8}
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
            <Image
              src={assets.advisoryCommittees.nadvi}
              alt={"Abul Hasan Ali Nadvi"}
              width={900}
              height={600}
              className="rounded-lg "
            />
          </Box>
          <Box width="100%">
            <Title title={"সাইয়িদ আবুল হাসান আলী নদভী ই-পাঠাগার"} />
            <Box mt={2} mb={5} display="flex" justifyContent="center">
              <CourseTitle3 />
            </Box>
            <Details
              details="জ্ঞান মানেই হচ্ছে শিক্ষা। আর বই হচ্ছে শিক্ষার বাহন। সুতরাং যতই বইয়ের লিখন, প্রকাশন ও বিপণন বাড়বে ততই আলোর রাজ্যেরও বৃদ্ধি ঘটবে। এ জন্য ব্যক্তিগত ও সমষ্টিগতভাবে বই পড়তে হবে। বর্তমানে সোশ্যাল মিডিয়ায় মাত্রাতিরিক্ত বুদ হওয়ার কারণে পাঠ্যবইয়ের বাইরে বই বলতে আমরা কিছুই বুঝিনা। পবিত্র কুরআনে আল্লাহ তায়ালা বলেছেন, ‘পড় তোমার প্রতিপালকের নামে, যিনি সৃষ্টি করেছেন। যিনি কলমের সাহায্যে শিক্ষা দিয়েছেন। তিনি মানুষকে শিক্ষা দিয়েছেন, যা সে জানত না।’ (সূরা আল-আলাক, আয়াত-১,৪,৫)...
"
            />
            <Box my={4}>
              <Details
                details="বিভিন্ন বিষয়ে সুশৃঙ্খল ও পূর্ণাঙ্গ জ্ঞানার্জন এবং পরিপূর্ণ মানসিক প্রশান্তি লাভ করতে হলে অবশ্যই বই পড়া দরকার। ফিতনার এ যুগে অনলাইনে দ্বীন চর্চা নিশ্চিত ঈমান সন্দিহান করে তোলে। সত্য অন্বেষণে নিজের বিবেক বুদ্ধি দিয়ে ঈমান জোরদার ও আক্বিদা ঠিক রাখা কেবল বই পড়ার মাধ্যমেই সম্ভব। সেই লক্ষ্যে আদ-দোহা ইনস্টিটউট বাংলা ও ইংরেজি ভাষায় রচিত শ্রেষ্ঠতম বইগুলো সংগ্রহ করে সমৃদ্ধ করা হয়েছে সাইয়িদ আবুল হাসান আলী নদভী ই-পাঠাগার। যা সকল পাঠকের জন্য উন্মুক্ত।
"
              />
            </Box>

            <Box component={Link} href={"resources/library"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "primary.main",
                  color: "secondary.main",
                  width: "100%",
                  textSizeAdjust: "auto",
                  ":hover": {
                    backgroundColor: "success.main",
                    color: "primary.main",
                    boxShadow: "none",
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
                ই-পাঠাগার
              </Button>
            </Box>
          </Box>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default EPathagar;
