"use client";

import LoadingPage from "@/app/loading";
import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import {
  useGetSingleAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
} from "@/redux/features/admin/departmentManagementApi";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: Promise<{
    departmentId: string;
  }>;
};

const DepartmentUpdatePage = ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSingleAcademicDepartmentQuery(
    unwrappedParams?.departmentId
  );
  const [updateDepartment, { isLoading: updating }] =
    useUpdateAcademicDepartmentMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    let imageUrl = data?.image || "";
    if (values.file) {
      imageUrl = await uploadImageToCloudinary(values.file);
      if (!imageUrl) {
        toast.error(`Failed to upload image! Please try again.`);
      }
    }
    const id = unwrappedParams.departmentId;
    const updatedData = {
      name: values.name,
      image: imageUrl,
      position: Number(values.position),
    };
    console.log("updated", updatedData);

    try {
      const res = await updateDepartment({ id, updatedData });
      console.log(res);

      if (res?.data?._id) {
        toast.success(
          res?.data?.message || "Academic Department Updated Successfully!!!"
        );
        await refetch();
        router.push("/dashboard/admin/department-management");
      } else {
        toast.error(
          res?.data?.message || "Failed to update Academic Department!!!"
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    position: data?.position || "",
    image: data?.image || "",
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            my: "auto",
            mt: {
              lg: 10,
              md: 8,
              sm: 4,
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
            Update Academic Department Info
          </Typography>

          <DohaForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={3} my={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Academic Department Name"
                  fullWidth={true}
                  type="text"
                  name="name"
                  required
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaInput
                  label="Academic Department Position"
                  fullWidth={true}
                  type="number"
                  name="position"
                  required
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <DohaFileUploader
                  sx={{
                    width: "100%",
                    backgroundColor: "success.main",
                    ":hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                  label="image"
                  name="file"
                />
              </Grid>
            </Grid>
            {updating ? (
              <Button
                disabled
                fullWidth
                sx={{
                  margin: "16px 0px",
                }}
              >
                <CircularProgress thickness={6} />;
              </Button>
            ) : (
              <Button
                sx={{
                  margin: "16px 0px",
                }}
                fullWidth
                type="submit"
              >
                Update Department
              </Button>
            )}
          </DohaForm>
        </Box>
      )}
    </>
  );
};

export default DepartmentUpdatePage;
