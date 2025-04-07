"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Grid2,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
});
const defaultValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [forgotPass, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPass = async (values: FieldValues) => {
    try {
      const res = await forgotPass(values);
      console.log(res.data);
      if (res?.data?.success) {
        toast.success(
          res?.data?.message || "Password reset link sent to your email"
        );
        router.push("/reset-password");
      } else {
        toast.error(res?.data?.message);
        router.push("/");
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err?.message || "Something went wrong!!");
    }
  };

  return (
    <DohaForm
      onSubmit={handleForgotPass}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Box my={3}>
        <DohaInput name="email" label="Email" type="email" fullWidth={true} />
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

export default ForgotPasswordForm;
