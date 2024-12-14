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
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { useState } from "react";

import { IItem } from "@/type";
import TipTapEditor from "@/components/form/TipTapEditor";
import { useCreateOfferedCourseMutation } from "@/redux/features/admin/offeredCourseManagementApi";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { courseStatusOptions } from "@/constant/global";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateOfferedCourseModal = ({ open, setOpen }: TProps) => {
  const [createCourse, { isLoading: creating }] =
    useCreateOfferedCourseMutation();
  const { data: courseData, isLoading: courseLoading } = useGetAllCoursesQuery(
    {}
  );

  const courses = courseData?.courses?.map((course) => ({
    label: course?.courseName,
    value: course?._id,
  }));

  // console.log(authors, CourseCategoryData?.Coursecategorys);
  const handleFormSubmit = async (values: FieldValues) => {
    const newOfferedCourse = {
      courseTitle: values.courseTitle,
      course: values.course,
      batch: values.batch,
      orientation: values.orientation,
      admissionDeadline: values.admissionDeadline,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
    };

    console.log("newCourse", newOfferedCourse);
    try {
      const res = await createCourse(newOfferedCourse).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Offered Course created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data || "Failed to create Offered Course!!!");
      // console.error(err);
    }
  };

  const defaultValues = {
    courseTitle: "",
    course: "",
    batch: "",
    orientation: "",
    admissionDeadline: "",
    startDate: "",
    endDate: "",
    status: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create Offered Course">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaInput
              label="Course Title"
              fullWidth={true}
              type="text"
              name="courseTitle"
              required
            />
          </Grid>
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
              label="Orientation"
              fullWidth={true}
              name="orientation"
              disableFuture={false}
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
            Create Offered Course
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateOfferedCourseModal;
