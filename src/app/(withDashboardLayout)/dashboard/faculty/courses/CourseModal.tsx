"use client";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import DohaFullScreenModal from "@/components/shared/DohaModal/DohaFullScreenModal";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { useState } from "react";
import { TDepartment, TItem } from "@/type";
import dynamic from "next/dynamic";
import SubmitButton from "@/components/common/SubmitButton";

const RichTextEditor = dynamic(
  () => import("@/components/form/RichTextEditor"),
  {
    ssr: false, // Disables SSR for this component
  }
);

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CourseModal = ({ open, setOpen, data }: TProps) => {
  const [content, setContent] = useState("");

  // mutation
  // const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  // const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const { data: departmentData } = useGetAllAcademicDepartmentsQuery({});

  const departments = departmentData?.data?.map((department: TDepartment) => ({
    label: department.name,
    value: department?._id,
  }));

  const handleChange = (content: string) => {
    setContent(content);
  };

  // const handleFormSubmit = async (values: FieldValues) => {
  //   try {
  //     let result;
  //     let imageUrl = data ? data?.image : "";
  //     if (values.file) {
  //       imageUrl = await uploadImageToCloudinary(values.file);
  //       if (!imageUrl) {
  //         toast.error(`Failed to upload image! Please try again.`);
  //       }
  //     }
  //     delete values.file;
  //     console.log(values);
  //     if (data) {
  //       const id = data._id;
  //       const updatedData = {
  //         academicDepartment: values.academicDepartment,
  //         courseName: values.courseName,
  //         slug: values.slug,
  //         medium: values.medium,
  //         totalClasses: values.totalClasses,
  //         courseDuration: values.courseDuration,
  //         schedule: values.schedule,
  //         classDuration: values.classDuration,
  //         fee: {
  //           total: values.fee.total,
  //           admission: values.fee.admission,
  //           monthly: values.fee.monthly,
  //         },
  //         feePaymentMethod: values.feePaymentMethod,
  //         contact: values.contact,
  //         courseDescription: content || data ? data?.name : "",
  //         courseImage:
  //           imageUrl ||
  //           "https://res.cloudinary.com/dvt8faj0s/image/upload/v1732036461/pngtree-no-image_wgj8uf.jpg",
  //       };

  //       result = await updateCourse({ id, updatedData }).unwrap();
  //       // console.log("edit", result);
  //       if (result?.success) {
  //         toast.success(result?.message || "Book Updated Successfully!!!");
  //       }
  //     } else {
  //       const newCourse = {
  //         academicDepartment: values.academicDepartment,
  //         courseName: values.courseName,
  //         slug: values.slug,
  //         medium: values.medium,
  //         totalClasses: values.totalClasses,
  //         courseDuration: values.courseDuration,
  //         schedule: values.schedule,
  //         classDuration: values.classDuration,
  //         fee: {
  //           total: values.fee.total,
  //           admission: values.fee.admission,
  //           monthly: values.fee.monthly,
  //         },
  //         feePaymentMethod: values.feePaymentMethod,
  //         contact: values.contact,
  //         courseDescription: content || data ? data?.name : "",
  //         courseImage:
  //           imageUrl ||
  //           "https://res.cloudinary.com/dvt8faj0s/image/upload/v1732036461/pngtree-no-image_wgj8uf.jpg",
  //       };
  //       result = await createCourse(newCourse).unwrap();
  //       // console.log("add", result);
  //       if (result?.success) {
  //         toast.success(result?.message || "Book created successfully!!!");
  //       }
  //     }
  //   } catch (err: any) {
  //     toast.error(err?.message || "Something went wrong!!!");
  //   } finally {
  //     setOpen(false);
  //   }
  // };

  const defaultValues = {
    academicDepartment: data ? data?.academicDepartment : "",
    courseName: data ? data?.courseName : "",
    slug: data ? data?.slug : "",
    medium: data ? data?.medium : "",
    totalClasses: data ? data?.totalClasses : "",
    courseDuration: data ? data?.courseDuration : "",
    schedule: data ? data?.schedule : "",
    classDuration: data ? data?.classDuration : "",
    fee: {
      total: data ? data?.fee?.total : "",
      admission: data ? data?.fee?.admission : "",
      monthly: data ? data?.fee?.monthly : "",
    },
    feePaymentMethod: data ? data?.feePaymentMethod : "",
    contact: data ? data?.contact : "",
  };

  return (
    <DohaFullScreenModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "View Course Details" : "Create Course"}`}
    >
      <DohaForm onSubmit={() => setOpen(false)} defaultValues={defaultValues}>
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
              items={departments as TItem[]}
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
        {/* <SubmitButton
          label="Course"
          loading={isCreating || isUpdating}
          data={data}
        /> */}
      </DohaForm>
    </DohaFullScreenModal>
  );
};

export default CourseModal;
