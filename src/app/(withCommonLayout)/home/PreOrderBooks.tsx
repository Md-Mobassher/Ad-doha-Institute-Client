import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import CourseTitle3 from "../courses/components/CourseTitle3";
import Details from "@/components/ui/Details";
import Link from "next/link";
import CourseTitle2 from "../courses/components/CourseTitle2";
import preOrder from "@/assets/resourses/books/preorderbooks.jpg";

const PreOrderBooks = () => {
  return (
    <Box>
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title="নতুন প্রকাশিত বই" />
        </Stack>
        <Stack
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems="center"
          gap={8}
          mt={2}
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
              src={preOrder}
              alt={"preOrder"}
              width={900}
              height={400}
              className="rounded-lg "
            />
          </Box>
          <Box width="100%">
            <Title title={"প্রি-অর্ডার করলেই পাচ্ছেন ৪০% ছাড়!"} />
            <Box mt={2} mb={5} display="flex" justifyContent="center">
              <CourseTitle3 />
            </Box>
            <Details details="মহান আল্লাহর অশেষ রহমতে আপনাদের বহুল কাঙ্ক্ষিত ও প্রতীক্ষিত দুটি বই আমরা আপনাদের হাতে তুলে দেওয়ার প্রয়াস পাচ্ছি। আজ থেকে শুরু হচ্ছে প্রি-অর্ডার। আদ-দোহা ইনস্টিটিউট -এর প্রকাশিত দুটি বই প্রি-অর্ডার করলেই পাচ্ছেন ৪০% ছাড়!" />
            <Box my={2}>
              <Details details="প্রি-অর্ডার চলবে ০৩ নভেম্বর ২০২৪ পর্যন্ত। দুইটি বইয়ের মুদ্রিত মূল্য ২৩০ টাকা। প্রি-অর্ডারে পাচ্ছেন মাত্র ১৪০ টাকায়।" />
            </Box>
            <CourseTitle2 title="নোট :" />
            <Box mt={1} mb={2}>
              <Details details="  ঢাকার ভেতর ডেলিভারি চার্জ ৫০ টাকা" />
              <Details details="  ঢাকার বাইরে ডেলিভারি চার্জ ৯০ টাকা।" />
            </Box>
            <CourseTitle2 title="পেমেন্ট করুন :" />
            <Box mt={1} mb={2}>
              <Details details="বিকাশ / নগদ (পার্সোনাল) : 01916016099" />
            </Box>
            <CourseTitle2 title="প্রি-অর্ডার করতে নিচে ক্লিক করুন " />
            <Box
              component={Link}
              href={"https://forms.gle/5n4bcMovcxF2sDMQA"}
              target="_blank"
            >
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
                  mt: 2,
                }}
              >
                প্রি-অর্ডার
              </Button>
            </Box>
          </Box>
        </Stack>
      </DohaContainer>
    </Box>
  );
};

export default PreOrderBooks;
