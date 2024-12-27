"use client";

import LoadingPage from "@/app/loading";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { use } from "react";
import { IItem } from "@/type";
import {
  useGetSingleEnrolledCourseQuery,
  useUpdateEnrolledCourseMutation,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import { enrolStatusOptions } from "@/constant/global";

type TParams = {
  params: Promise<{
    courseId: string;
  }>;
};
const EnrolledCourseUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleEnrolledCourseQuery(
    unwrappedParams?.courseId
  );
  const [updateCourse, { isLoading: updating }] =
    useUpdateEnrolledCourseMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const updateOfferedCourse = {
      isEnrolled: values.isEnrolled === "TRUE" ? true : false,
    };

    try {
      const res = await updateCourse({
        id: unwrappedParams.courseId,
        values: updateOfferedCourse,
      }).unwrap();
      // console.log("res" + res);

      if (res?._id) {
        toast.success(res.message || "Enrolled Course Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/enrolled-course");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data || "Failied to update enrolled-course!!!");
    }
  };

  const defaultValues = {
    offeredCourse: data?.offeredCourse || "",
    student: data?.student || "",
    isEnrolled: data?.isEnrolled || "",
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
            border: "1px solid lightgray",
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
            Update Enrolled Course
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaSelectField
                  label="Is Enrolled"
                  fullWidth={true}
                  items={enrolStatusOptions as IItem[]}
                  name="isEnrolled"
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
                Update Enrolled Course
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default EnrolledCourseUpdatePage;
