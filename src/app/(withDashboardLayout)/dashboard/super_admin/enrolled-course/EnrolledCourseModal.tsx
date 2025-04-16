"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TEnrolledCourse, TItem, TOfferedCourse, TStudent } from "@/type";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import {
  useCreateEnrolledCourseByAdminMutation,
  useUpdateEnrolledCourseMutation,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/offeredCourseManagementApi";
import { useGetAllStudentsQuery } from "@/redux/features/admin/studentManagementApi";
import { useGetAllTransactionsQuery } from "@/redux/features/admin/transactionManagementApi";
import SubmitButton from "@/components/common/SubmitButton";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EnrolledCourseModal = ({ open, setOpen, data }: TProps) => {
  const [createCourse, { isLoading: isCreating }] =
    useCreateEnrolledCourseByAdminMutation();
  const [updateCourse, { isLoading: isUpdating }] =
    useUpdateEnrolledCourseMutation();

  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery({});
  const { data: studentData } = useGetAllStudentsQuery({});
  const { data: transactionData } = useGetAllTransactionsQuery({});

  const offeredCourses = offeredCourseData?.data?.map(
    (course: TOfferedCourse) => ({
      label: course?.course?.courseName + " " + "(ব্যাচ-" + course?.batch + ")",
      value: course?._id,
    })
  );
  const students = studentData?.data?.map((student: TStudent) => ({
    label: student?.fullName,
    value: student?._id,
  }));
  const transactions = transactionData?.data?.map((transaction: any) => ({
    label: transaction?.transactionId,
    value: transaction?._id,
  }));

  // console.log(authors, CourseCategoryData?.Coursecategorys);
  const handleFormSubmit = async (values: FieldValues) => {
    const newEnrolledCourse = {
      offeredCourse: values.offeredCourse,
      student: values.student,
      transaction: values.transaction,
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
    offeredCourse: data ? data?.offeredCourse : "",
    student: data ? data?.student : "",
    transaction: data ? data?.transaction : "",
  };

  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Enrolled Course" : "Create Enrolled Course"}`}
    >
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Offered Course"
              fullWidth={true}
              items={offeredCourses as TItem[]}
              name="offeredCourse"
              required
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Student"
              fullWidth={true}
              items={students as TItem[]}
              name="student"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Transaction"
              fullWidth={true}
              items={transactions as TItem[]}
              name="transaction"
              required
            />
          </Grid>
        </Grid>
        <SubmitButton
          label="Enrolled Course"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default EnrolledCourseModal;
