"use client";

import LoadingPage from "@/app/loading";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { use, useEffect, useState } from "react";
import { IItem } from "@/type";
import RichTextEditor from "@/components/form/RichTextEditor";

type TParams = {
  params: Promise<{
    courseId: string;
  }>;
};
const CourseUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleCourseQuery(
    unwrappedParams?.courseId
  );
  const [content, setContent] = useState("");
  const [updateCourse, { isLoading: updating }] = useUpdateCourseMutation();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllAcademicDepartmentsQuery({});

  useEffect(() => {
    if (data?.courseDescription) {
      setContent(data.courseDescription);
    } else {
      setContent("");
    }
  }, [data]);

  const departments = departmentData?.departments?.map((department) => ({
    label: department.name,
    value: department?._id,
  }));

  const handleFormSubmit = async (values: FieldValues) => {
    let imageUrl = data?.courseImage || "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
      if (!imageUrl) {
        toast.error(`Failed to upload image! Please try again.`);
      }
    }
    const updatedCourse = {
      academicDepartment: values.academicDepartment,
      courseName: values.courseName,
      slug: values.slug,
      medium: values.medium,
      totalClasses: values.totalClasses,
      courseDuration: values.courseDuration,
      schedule: values.schedule,
      classDuration: values.classDuration,
      fee: {
        total: values.fee.total,
        admission: values.fee.admission,
        monthly: values.fee.monthly,
      },
      feePaymentMethod: values.feePaymentMethod,
      contact: values.contact,
      courseDescription: content || "",
      courseImage: imageUrl,
    };

    try {
      const res = await updateCourse({
        id: unwrappedParams.courseId,
        values: updatedCourse,
      }).unwrap();
      // console.log("res" + res);

      if (res?._id) {
        toast.success(res.message || "Course Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/course-management");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data || "Failied to update Course!!!");
    }
  };

  const handleChange = (content: string) => {
    setContent(content);
  };

  const defaultValues = {
    academicDepartment: data?.academicDepartment || "",
    courseName: data?.courseName || "",
    slug: data?.slug || "",
    medium: data?.medium || "",
    totalClasses: data?.totalClasses || "",
    courseDuration: data?.courseDuration || "",
    schedule: data?.schedule || "",
    classDuration: data?.classDuration || "",
    fee: {
      total: data?.fee?.total || "",
      admission: data?.fee?.admission || "",
      monthly: data?.fee?.monthly || "",
    },
    feePaymentMethod: data?.feePaymentMethod || "",
    contact: data?.contact || "",
  };

  console.log("content" + content);
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
            Update Course Info
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Course Title"
                  fullWidth={true}
                  type="text"
                  name="courseName"
                  required
                />
              </Grid>

              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaSelectField
                  label="Department"
                  fullWidth={true}
                  items={departments as IItem[]}
                  name="academicDepartment"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Slug"
                  fullWidth={true}
                  type="text"
                  name="slug"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Medium"
                  fullWidth={true}
                  type="text"
                  name="medium"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Total Classes"
                  fullWidth={true}
                  type="text"
                  name="totalClasses"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Course Duration"
                  fullWidth={true}
                  type="text"
                  name="courseDuration"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Schedule"
                  fullWidth={true}
                  type="text"
                  name="schedule"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Class Duration"
                  fullWidth={true}
                  type="text"
                  name="classDuration"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Total Fees"
                  fullWidth={true}
                  type="text"
                  name="fee.total"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Admission Fees"
                  fullWidth={true}
                  type="text"
                  name="fee.admission"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Monthly Fees"
                  fullWidth={true}
                  type="text"
                  name="fee.monthly"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Fee Payment Method"
                  fullWidth={true}
                  type="text"
                  name="feePaymentMethod"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaInput
                  label="Contact Number"
                  fullWidth={true}
                  type="text"
                  name="contact"
                  required
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <DohaFileUploader
                  sx={{
                    width: "100%",
                    backgroundColor: "success.main",
                    ":hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                  label="Image"
                  name="file"
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} mb={4}>
                <RichTextEditor
                  placeholder="Enter Course Description..."
                  value={content}
                  onChange={handleChange}
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
                Update Course
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default CourseUpdatePage;
