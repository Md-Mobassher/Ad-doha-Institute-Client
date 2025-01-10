"use client";

import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { paymentMethodOptions } from "@/constant/global";
import { IItem } from "@/type";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import CourseTitle2 from "../courses/components/CourseTitle2";
import payment from "@/assets/payment.svg";
import { useCreateEnrolledCourseMutation } from "@/redux/features/admin/enrolledCourseManagementApi";
import Title from "@/components/ui/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/services/auth.services";

const PaymentPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  const [enrollCourse, { isLoading: updating }] =
    useCreateEnrolledCourseMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const createEnrollCourse = {
      // academicDepartment: selectedDepartment,
      course: values.course,
      faculty: values.faculty,
      batch: values.batch,
      orientation: values.orientation,
      admissionDeadline: values.admissionDeadline,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
    };

    try {
      // const res = await enrollCourse({
      //   id: unwrappedParams.courseId,
      //   values: createEnrollCourse,
      // }).unwrap();
      // // console.log("res" + res);
      // if (res?._id) {
      //   toast.success(res.message || "Offered Course Updated Successfully!!!");
      //   await refetch();
      //   router.push("/dashboard/admin/offered-course");
      // }
    } catch (err: any) {
      // console.error(err);
      // toast.error(err.data || "Failied to update Course!!!");
    }
  };

  const defaultValues = {
    // academicDepartment: data?.academicDepartment || "",
    // course: data?.course?._id || "",
    // faculty: data?.faculty || "",
    // batch: data?.batch || "",
    // orientation: data?.orientation || "",
    // admissionDeadline: data?.admissionDeadline || "",
    // startDate: data?.startDate || "",
    // endDate: data?.endDate || "",
    // status: data?.status || "",
  };

  return (
    <Box>
      <PageTitle title="পেমেন্ট" />

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
              src={payment}
              alt={"aim"}
              width={400}
              height={400}
              className="rounded-lg border p-4"
            />
          </Box>

          <Stack width="100%" gap={5}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={{ lg: "30px", md: "30px", sm: "20px", xs: "15px" }}
              flexWrap="wrap"
              mt={6}
            >
              <Title title=" নগদ / বিকাশ -" />
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
                +8801916-016099
              </Typography>
            </Stack>
            <CourseTitle2
              details={`কোর্সে ভর্তি হতে কোর্স ফি উক্ত নাম্বারে বিকাশ বা নগদে সেন্ড মানি করুন। এরপর ট্রাঞ্জেকশন আইডিটি নিচের ফরমে (Transaction ID) তে ফিলাপ করুন এবং যে নাম্বার থেকে সেন্ড মানি করেছেন সেই নাম্বারটি দিন (Phone Number) এ দিন। এরপর কত টাকা দিয়েছেন সেই তথ্যটি (Amount) এ বসান। এবং সবশেষে কোন মাধ্যমে টাকা পাঠিয়েছেন (যেমনঃ বিকাশ, নগদ, সেলফিন) সেই তথ্যটি সিলেক্ট করে ফরমটি সাবমিট করুন।`}
            />
            <CourseTitle2
              details={`আপনার তথ্যগুলো সর্বোচ্চ ২৪ ঘন্টার মধ্যে যাচাই বাছাই করে আপনাকে কোর্সের এক্সেস দেয়া হবে। এবং ফেসবুক গ্রুপে এড করে নেয়া হবে।`}
            />
          </Stack>
        </Stack>

        {/* <>
          {isLoading ? (
            <LoadingPage />
          ) : ( */}
        <Box
          sx={{
            maxWidth: "100%",
            mx: "auto",
            my: "auto",
            mt: {
              lg: 4,
              md: 3,
              sm: 2,
              xs: 0,
            },

            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            mb={3}
            fontWeight={600}
            textAlign="center"
            color={"primary.main"}
          >
            এনরোল করুন
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Student ID"
                  fullWidth={true}
                  type="text"
                  name="student"
                  required
                  defaultValue={"sdfdf"}
                  disabled
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Offered Course"
                  fullWidth={true}
                  type="text"
                  name="offeredCourse"
                  required
                  defaultValue={"hgfh"}
                  disabled
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Transaction ID"
                  fullWidth={true}
                  type="text"
                  name="transactionId"
                  required
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Phone Number (Used in Transaction)"
                  fullWidth={true}
                  type="number"
                  name="phoneNumber"
                  required
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Amount"
                  fullWidth={true}
                  type="number"
                  name="amount"
                  required
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Payment Method"
                  fullWidth={true}
                  items={paymentMethodOptions as IItem[]}
                  name="paymentMethod"
                  required
                />
              </Grid>
            </Grid>
            {updating ? (
              <Button
                disabled
                fullWidth
                sx={{
                  margin: "10px 0px",
                }}
              >
                <CircularProgress thickness={6} />;
              </Button>
            ) : (
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth
                type="submit"
              >
                সাবমিট
              </Button>
            )}
          </DohaForm>
        </Box>
        {/* )}
        </> */}
      </DohaContainer>
    </Box>
  );
};

export default PaymentPage;
