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
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { courseStatusOptions } from "@/constant/global";
import {
  useGetSingleOfferedCourseQuery,
  useUpdateOfferedCourseMutation,
} from "@/redux/features/admin/offeredCourseManagementApi";
import { useGetAllCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import DohaInput from "@/components/form/DohaInput";

type TParams = {
  params: Promise<{
    courseId: string;
  }>;
};
const OfferedCourseUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleOfferedCourseQuery(
    unwrappedParams?.courseId
  );
  const [updateCourse, { isLoading: updating }] =
    useUpdateOfferedCourseMutation();
  const { data: courseData, isLoading: courseLoading } = useGetAllCoursesQuery(
    {}
  );
  const courses = courseData?.courses?.map((course) => ({
    label: course?.courseName,
    value: course?._id,
  }));

  const handleFormSubmit = async (values: FieldValues) => {
    const updateOfferedCourse = {
      course: values.course,
      batch: values.batch,
      orientation: values.orientation,
      admissionDeadline: values.admissionDeadline,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
    };

    try {
      const res = await updateCourse({
        id: unwrappedParams.courseId,
        values: updateOfferedCourse,
      }).unwrap();
      // console.log("res" + res);

      if (res?._id) {
        toast.success(res.message || "Offered Course Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/offered-course");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data || "Failied to update Course!!!");
    }
  };

  const defaultValues = {
    course: data?.course?._id || "",
    batch: data?.batch || "",
    orientation: data?.orientation || "",
    admissionDeadline: data?.admissionDeadline || "",
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    status: data?.status || "",
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
            Update Offered Course
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Course"
                  fullWidth={true}
                  items={courses as IItem[]}
                  name="course"
                  required
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Batch"
                  fullWidth={true}
                  type="text"
                  name="batch"
                  required
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaDatePicker
                  label="Admission Deadline"
                  fullWidth={true}
                  name="admissionDeadline"
                  disableFuture={false}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaDatePicker
                  label="Orientation"
                  fullWidth={true}
                  name="orientation"
                  disableFuture={false}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaDatePicker
                  label="Start Date"
                  fullWidth={true}
                  name="startDate"
                  disableFuture={false}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaDatePicker
                  label="End Date"
                  fullWidth={true}
                  name="endDate"
                  disableFuture={false}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Status"
                  fullWidth={true}
                  items={courseStatusOptions as IItem[]}
                  name="status"
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
                Update Offered Course
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default OfferedCourseUpdatePage;
