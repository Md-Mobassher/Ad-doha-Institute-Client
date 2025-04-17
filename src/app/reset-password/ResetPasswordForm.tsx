"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  newPassword: z.string().min(6, "Must be at least 6 characters"),
});

const ResetPasswordForm = () => {
  const router = useRouter();
  const [resetPass, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      toast.error("Invalid or missing reset token");
      router.push("/");
    }
  }, [email, token, router]);

  const handleResetPass = async (values: FieldValues) => {
    const resetData = {
      email: email,
      newPassword: values.newPassword,
    };
    try {
      const res = await resetPass({ resetData, token }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Password reset successful");
        router.push("/login");
      } else {
        toast.error(res?.message || "Password reset failed");
        router.push("/");
      }
    } catch (err: any) {
      // console.error(err.message);
      toast.error(err?.message || "Something went wrong!!");
    }
  };

  const defaultValues = {
    email: email || "",
    newPassword: "",
  };

  return (
    <DohaForm
      onSubmit={handleResetPass}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Box my={3}>
        <DohaInput
          name="email"
          label="Email"
          type="email"
          fullWidth={true}
          disabled
        />
      </Box>
      <Box my={3}>
        <DohaInput
          name="newPassword"
          label="New Password"
          type="password"
          fullWidth={true}
        />{" "}
      </Box>

      {isLoading ? (
        <Button
          disabled
          fullWidth
          sx={{
            margin: "10px 0px",
          }}
        >
          <CircularProgress />;
        </Button>
      ) : (
        <Button
          sx={{
            margin: "10px 0px",
          }}
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      )}

      <Typography component="p" fontWeight={500}>
        Already know your password? Please{" "}
        <Link href="/login" className="text-green-600">
          Login
        </Link>
      </Typography>
    </DohaForm>
  );
};

export default ResetPasswordForm;
