"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const DashboardPage = () => {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (user?.role) {
      router.replace(`/dashboard/${user.role}`);
    } else {
      router.replace("/login?error=unauthorized");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

export default DashboardPage;
