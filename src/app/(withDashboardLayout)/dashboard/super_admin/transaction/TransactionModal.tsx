"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Button, CircularProgress, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TItem, TCourse, TOfferedCourse, TStudent } from "@/type";
import DohaModal from "@/components/shared/DohaModal/DohaModal";

import { useGetAllOfferedCoursesQuery } from "@/redux/features/admin/offeredCourseManagementApi";
import { useGetAllStudentsQuery } from "@/redux/features/admin/studentManagementApi";
import {
  useCreateTransactionByAdminMutation,
  useUpdateTransactionMutation,
} from "@/redux/features/admin/transactionManagementApi";
import DohaInput from "@/components/form/DohaInput";
import { paymentMethodOptions, paymentStatusOptions } from "@/constant/global";
import { useState } from "react";
import SubmitButton from "@/components/common/SubmitButton";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionModal = ({ open, setOpen, data }: TProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { data: offeredCourse } = useGetAllOfferedCoursesQuery({});
  const { data: studentData } = useGetAllStudentsQuery({});
  const [createTransaction, { isLoading: isCreating }] =
    useCreateTransactionByAdminMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const offeredCourses = offeredCourse?.data?.offeredCourses?.map(
    (course: TOfferedCourse) => ({
      label: course?.course?.courseName + " " + "(ব্যাচ-" + course?.batch + ")",
      value: course?._id,
    })
  );
  const students = studentData?.students?.map((student: TStudent) => ({
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
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? "Update Transaction" : "Create Transaction"}`}
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
              items={students as TItem[]}
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
              items={paymentMethodOptions as TItem[]}
              name="paymentMethod"
              required
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DohaSelectField
              label="Payment Status"
              fullWidth={true}
              items={paymentStatusOptions as TItem[]}
              name="paymentStatus"
              required
            />
          </Grid>
        </Grid>
        <SubmitButton
          label="Transaction"
          loading={isCreating || isUpdating}
          data={data}
        />
      </DohaForm>
    </DohaModal>
  );
};

export default TransactionModal;
