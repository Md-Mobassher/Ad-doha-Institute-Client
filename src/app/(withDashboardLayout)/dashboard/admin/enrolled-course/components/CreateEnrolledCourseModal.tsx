"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { IItem } from "@/type";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { useCreateEnrolledCourseByAdminMutation } from "@/redux/features/admin/enrolledCourseManagementApi";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/offeredCourseManagementApi";
import { useGetAllStudentsQuery } from "@/redux/features/admin/studentManagementApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateEnrolledCourseModal = ({ open, setOpen }: TProps) => {
  const [createCourse, { isLoading: creating }] =
    useCreateEnrolledCourseByAdminMutation();
  const { data: offeredCourseData, isLoading: offeredCourseLoading } =
    useGetAllOfferedCoursesQuery({});
  const { data: studentData, isLoading: facultyLoading } =
    useGetAllStudentsQuery({});

  const offeredCourses = offeredCourseData?.offeredCourses?.map((course) => ({
    label: course?.course?.courseName + " " + "(ব্যাচ-" + course?.batch + ")",
    value: course?._id,
  }));
  const students = studentData?.students?.map((student) => ({
    label: student?.fullName,
    value: student?._id,
  }));

  // console.log(authors, CourseCategoryData?.Coursecategorys);
  const handleFormSubmit = async (values: FieldValues) => {
    const newEnrolledCourse = {
      offeredCourse: values.offeredCourse,
      student: values.student,
    };

    // console.log("newCourse", newEnrolledCourse);
    try {
      const res = await createCourse(newEnrolledCourse).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Enrolled Course created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data || "Failed to create Enrolled Course!!!");
      // console.error(err);
    }
  };

  const defaultValues = {
    offeredCourse: "",
    student: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create Enrolled Course">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Offered Course"
              fullWidth={true}
              items={offeredCourses as IItem[]}
              name="offeredCourse"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Student"
              fullWidth={true}
              items={students as IItem[]}
              name="student"
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
            Create Enrolled Course
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateEnrolledCourseModal;
