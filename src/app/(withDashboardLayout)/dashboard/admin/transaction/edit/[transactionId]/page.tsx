"use client";

import LoadingPage from "@/app/loading";
import DohaForm from "@/components/form/DohaForm";
import DohaSelectField from "@/components/form/DohaSelectField";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { use } from "react";
import { IItem } from "@/type";
import {
  useGetSingleEnrolledCourseQuery,
  useUpdateEnrolledCourseMutation,
} from "@/redux/features/admin/enrolledCourseManagementApi";
import {
  enrolStatusOptions,
  paymentMethodOptions,
  paymentStatusOptions,
} from "@/constant/global";
import {
  useGetSingleTransactionQuery,
  useUpdateTransactionMutation,
} from "@/redux/features/admin/transactionManagementApi";
import DohaInput from "@/components/form/DohaInput";

type TParams = {
  params: Promise<{
    transactionId: string;
  }>;
};
const TransactionUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleTransactionQuery(
    unwrappedParams?.transactionId
  );
  const [updateTransaction, { isLoading: updating }] =
    useUpdateTransactionMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const updateTransactionStatus = {
      paymentStatus: values.paymentStatus,
    };

    try {
      const res = await updateTransaction({
        id: unwrappedParams.transactionId,
        values: updateTransactionStatus,
      }).unwrap();
      // console.log("res" + res);

      if (res?._id) {
        toast.success(res.message || "Transaction Updated Successfully!!!");
        await refetch();
        router.push("/dashboard/admin/transaction");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.data || "Failied to update transaction!!!");
    }
  };

  const defaultValues = {
    transactionId: data?.transactionId || "",
    phoneNumber: data?.phoneNumber || "",
    paymentMethod: data?.paymentMethod || "",
    paymentStatus: data?.paymentStatus || "",
  };

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
            Update Transaction
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
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
                Update Transaction
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default TransactionUpdatePage;
