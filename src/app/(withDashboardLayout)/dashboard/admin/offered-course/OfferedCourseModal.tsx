"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { TDepartment, TItem, TCourse, TFaculty } from "@/type";
import {
  useCreateOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
} from "@/redux/features/admin/offeredCourseManagementApi";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { courseStatusOptions } from "@/constant/global";
import { useGetAllTeachersQuery } from "@/redux/features/admin/teacherManagementApi";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/common/SubmitButton";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OfferedCourseModal = ({ open, setOpen, data }: TProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [filteredCourses, setFilteredCourses] = useState<TItem[]>([]);

  const [createCourse, { isLoading: isCreating }] =
    useCreateOfferedCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] =
    useUpdateOfferedCourseMutation();

  const { data: courseData } = useGetAllCoursesQuery({});
  const { data: department } = useGetAllAcademicDepartmentsQuery({});
  const { data: facultyData } = useGetAllTeachersQuery({});

  const departments = department?.data?.map((department: TDepartment) => ({
    label: department?.name,
    value: department?._id,
  }));
  const faculties = facultyData?.data?.map((faculty: TFaculty) => ({
    label: faculty?.name,
    value: faculty?._id,
  }));

  useEffect(() => {
    if (data) {
      setSelectedDepartment(data?.academicDepartment);
      // Filter courses by selected department
      const filteredCourses = courseData?.data
        ?.filter(
          (course: TCourse) =>
            course?.academicDepartment === data?.academicDepartment
        )
        ?.map((course: TCourse) => ({
          label: course?.courseName,
          value: course?._id,
        }));
      setFilteredCourses(filteredCourses as TItem[]);
    }
  }, [data, courseData?.data]);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);

    // Filter courses by selected department
    const filteredCourses = courseData?.data
      ?.filter((course: TCourse) => course?.academicDepartment === value)
      ?.map((course: TCourse) => ({
        label: course?.courseName,
        value: course?._id,
      }));
    setFilteredCourses(filteredCourses as TItem[]);
  };

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      let result;

      if (data) {
        const id = data._id;
        const updatedData = {
          academicDepartment: values.academicDepartment,
          course: values.course,
          faculty: values.faculty,
          batch: values.batch,
          orientation: values.orientation,
          admissionDeadline: values.admissionDeadline,
          startDate: values.startDate,
          endDate: values.endDate,
          status: values.status,
        };
        result = await updateCourse({ id, updatedData }).unwrap();
        // console.log("edit", result);
        if (result?.success) {
          toast.success(
            result?.message || "Offered Course Updated Successfully!!!"
          );
        }
      } else {
        const newOfferedCourse = {
          academicDepartment: values.academicDepartment,
          course: values.course,
          faculty: values.faculty,
          batch: values.batch,
          orientation: values.orientation,
          admissionDeadline: values.admissionDeadline,
          startDate: values.startDate,
          endDate: values.endDate,
          status: values.status,
        };

        result = await createCourse(newOfferedCourse).unwrap();
        // console.log("add", result);
        if (result?.success) {
          toast.success(
            result?.message || "Offered Course created successfully!!!"
          );
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!");
    } finally {
      setOpen(false);
    }
  };

  const defaultValues = {
    academicDepartment: data ? data?.academicDepartment : "",
    course: data ? data?.course?._id : "",
    faculty: data ? data?.faculty : "",
    batch: data ? data?.batch : "",
    orientation: data ? data?.orientation : "",
    admissionDeadline: data ? data?.admissionDeadline : "",
    startDate: data ? data?.startDate : "",
    endDate: data ? data?.endDate : "",
    status: data ? data?.status : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Offered Course" : "Create Offered Course"}`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Academic Department"
              fullWidth={true}
              items={departments as TItem[]}
              name="academicDepartment"
              required
              onChange={handleDepartmentChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Course"
              fullWidth={true}
              items={filteredCourses as TItem[]}
              name="course"
              required
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Faculty"
              fullWidth={true}
              items={faculties as TItem[]}
              name="faculty"
              required
              isMulti={true}
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
              items={courseStatusOptions as TItem[]}
              name="status"
              required
            />
          </Grid>
        </Grid>
        <SubmitButton
          label="Offered Course"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default OfferedCourseModal;
