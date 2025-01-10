"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { IItem } from "@/type";
import DohaModal from "@/components/shared/DohaModal/DohaModal";

import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/offeredCourseManagementApi";
import { useGetAllStudentsQuery } from "@/redux/features/admin/studentManagementApi";
import { useCreateTransactionByAdminMutation } from "@/redux/features/admin/transactionManagementApi";
import DohaInput from "@/components/form/DohaInput";
import { paymentMethodOptions, paymentStatusOptions } from "@/constant/global";
import { useState } from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTransactionModal = ({ open, setOpen }: TProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { data: offeredCourseData, isLoading: offeredCourseLoading } =
    useGetAllOfferedCoursesQuery({});
  const { data: studentData, isLoading: facultyLoading } =
    useGetAllStudentsQuery({});
  const [createTransaction, { isLoading: creating }] =
    useCreateTransactionByAdminMutation();

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
    const newTransaction = {
      offeredCourse: values.offeredCourse,
      amount: Number(values.amount),
      studentId: values.studentId,
      transactionId: values.transactionId,
      phoneNumber: values.phoneNumber,
      paymentMethod: values.paymentMethod,
      paymentStatus: values.paymentStatus,
    };

    console.log("newTransaction", newTransaction);
    try {
      const res = await createTransaction(newTransaction).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Transaction created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data || "Failed to create Transaction!!!");
      // console.error(err);
    }
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
  };

  const defaultValues = {
    offeredCourse: "",
    student: "",
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create Transaction">
      <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={3} my={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Offered Course"
              fullWidth={true}
              items={offeredCourses as IItem[]}
              name="offeredCourse"
              required
              onChange={handleCourseChange}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Amount of Course"
              fullWidth={true}
              type="text"
              name="amount"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Student"
              fullWidth={true}
              items={students as IItem[]}
              name="studentId"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Transaction Id"
              fullWidth={true}
              type="text"
              name="transactionId"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaInput
              label="Phone Number (Using Transaction)"
              fullWidth={true}
              type="number"
              name="phoneNumber"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Payment Method"
              fullWidth={true}
              items={paymentMethodOptions as IItem[]}
              name="paymentMethod"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Payment Status"
              fullWidth={true}
              items={paymentStatusOptions as IItem[]}
              name="paymentStatus"
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
            Create Transaction
          </Button>
        )}
      </DohaForm>
    </DohaModal>
  );
};

export default CreateTransactionModal;
