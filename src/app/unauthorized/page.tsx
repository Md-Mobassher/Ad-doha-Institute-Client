"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SubTitle from "@/components/ui/SubTitle";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Title from "@/components/ui/Title";

const UnauthorizedPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("You are not authorized to access this page.");
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl text-center">
        <Image
          src="/images/unauthorized.jpg"
          alt="Unauthorized"
          width={300}
          height={300}
          className="mx-auto"
        />
        <Title title="Unauthorized" />
        <SubTitle title="You do not have permission to view this page." />

        <div className="mt-5">
          {user ? (
            <Link href="/dashboard">
              <Button variant="contained" color="primary" fullWidth>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="contained" color="primary" fullWidth>
                Go to Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
