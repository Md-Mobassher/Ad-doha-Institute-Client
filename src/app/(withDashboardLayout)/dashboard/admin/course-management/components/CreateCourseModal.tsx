"use client";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateCourseMutation } from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { useState } from "react";

import { IItem } from "@/type";
import TipTapEditor from "@/components/form/TipTapEditor";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCourseModal = ({ open, setOpen }: TProps) => {
  const [editorContent, setEditorContent] = useState<string>("");

  const [createCourse, { isLoading: creating }] = useCreateCourseMutation();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllAcademicDepartmentsQuery({});

  const departments = departmentData?.departments?.map((department) => ({
    label: department.name,
    value: department?._id,
  }));

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log("Editor Content:", content);
  };

  // console.log(authors, CourseCategoryData?.Coursecategorys);
  const handleFormSubmit = async (values: FieldValues) => {
    let imageUrl = "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
      if (!imageUrl) {
        toast.error("Failed to upload image!!!");
        // return;
      }
    }

    const newCourse = {
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
      // courseDescription: content || "",
      courseImage:
        imageUrl ||
        "https://res.cloudinary.com/dvt8faj0s/image/upload/v1732036461/pngtree-no-image_wgj8uf.jpg",
    };

    console.log("newCourse", newCourse);
    try {
      const res = await createCourse(newCourse).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Course created successfully!!!");
        setOpen(false);
        setEditorContent("");
      }
    } catch (err: any) {
      toast.error(err.data || "Failed to create Course!!!");
      // console.error(err);
    }
  };

  const defaultValues = {
    academicDepartment: "",
    courseName: "",
    slug: "",
    medium: "",
    totalClasses: "",
    courseDuration: "",
    schedule: "",
    classDuration: "",
    fee: {
      total: "",
      admission: "",
      monthly: "",
    },
    feePaymentMethod: "",
    contact: "",
  };

  // if (authorLoading || categoryLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Course"
    >
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
            <TipTapEditor
              content={editorContent}
              onUpdate={handleEditorChange}
            />
          </Grid>
        </Grid>
        {creating ? (
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
            Create New Course
          </Button>
        )}
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CreateCourseModal;
