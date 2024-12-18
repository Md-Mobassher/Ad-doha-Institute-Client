"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useGetAllCoursesQuery } from "@/redux/features/admin/courseManagementApi";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import { IItem } from "@/type";
import {
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "@/redux/features/admin/offeredCourseManagementApi";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import DohaDatePicker from "@/components/form/DohaDatePicker";
import { courseStatusOptions } from "@/constant/global";
import { useGetAllTeachersQuery } from "@/redux/features/admin/teacherManagementApi";
import { useState } from "react";

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
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllAcademicDepartmentsQuery({});
  const { data: facultyData, isLoading: facultyLoading } =
    useGetAllTeachersQuery({});

  const departments = departmentData?.departments?.map((department) => ({
    label: department?.name,
    value: department?._id,
  }));
  const faculties = facultyData?.departments?.map((department) => ({
    label: department?.name,
    value: department?._id,
  }));

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [filteredCourses, setFilteredCourses] = useState<IItem[]>([]);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);

    // Filter courses by selected department
    const filteredCourses = courseData?.courses
      ?.filter((course) => course?.academicDepartment === value)
      ?.map((course) => ({
        label: course?.courseName,
        value: course?._id,
      }));
    setFilteredCourses(filteredCourses as IItem[]);
  };

  // console.log(authors, CourseCategoryData?.Coursecategorys);
  const handleFormSubmit = async (values: FieldValues) => {
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

    // console.log("newCourse", newOfferedCourse);
    try {
      const res = await createCourse(newOfferedCourse).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Offered Course created successfully!!!");
        setOpen(false);
      }
      setFilteredCourses([]);
      setSelectedDepartment(null);
    } catch (err: any) {
      toast.error(err.data || "Failed to create Offered Course!!!");
      // console.error(err);
    }
  };

  const defaultValues = {
    academicDepartment: "",
    course: "",
    faculty: "",
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
            <DohaSelectField
              label="Academic Department"
              fullWidth={true}
              items={departments as IItem[]}
              name="academicDepartment"
              required
              onChange={handleDepartmentChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Course"
              fullWidth={true}
              items={filteredCourses as IItem[]}
              name="course"
              required
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <DohaSelectField
              label="Faculty"
              fullWidth={true}
              items={faculties as IItem[]}
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
