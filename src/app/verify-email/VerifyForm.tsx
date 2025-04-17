"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoadingPage from "../loading";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  otp: z.string().min(1, "OTP is required"),
});

const VerifyForm = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verify, { isLoading }] = useVerifyEmailMutation();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [isAutoFilled, setIsAutoFilled] = useState(false);

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (email && otp) {
      setFormData({ email, otp });
      setIsAutoFilled(true);
    }
    setLoading(false);
  }, [searchParams]);

  const handleVerifyEmail = async (values: FieldValues) => {
    if (!values.email || !values.otp) {
      toast.error("OTP and email not found");
      return;
    }

    values.otp = Number(values.otp);

    try {
      const res = await verify(values).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Email has been verified!");
        router.push("/");
      } else {
        toast.error(res?.message || "Failed to verify your email!");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      toast.error(error?.message || "Failed to verify your email!");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <DohaForm
      onSubmit={handleVerifyEmail}
      resolver={zodResolver(validationSchema)}
      defaultValues={formData}
    >
      <Box my={3}>
        <DohaInput
          name="email"
          label="Email"
          type="email"
          fullWidth
          disabled={isAutoFilled}
        />
      </Box>
      <Box my={3}>
        <DohaInput
          name="otp"
          label="OTP"
          type="number"
          fullWidth
          disabled={isAutoFilled}
        />
      </Box>

      {isLoading ? (
        <Button disabled fullWidth sx={{ margin: "10px 0px" }}>
          <CircularProgress />
        </Button>
      ) : (
        <Button type="submit" fullWidth sx={{ margin: "10px 0px" }}>
          Verify Email
        </Button>
      )}

      <Typography component="p" fontWeight={500}>
        Already Verified? Please{" "}
        <Link href="/login" className="text-green-600">
          Login
        </Link>
      </Typography>
    </DohaForm>
  );
};

export default VerifyForm;
