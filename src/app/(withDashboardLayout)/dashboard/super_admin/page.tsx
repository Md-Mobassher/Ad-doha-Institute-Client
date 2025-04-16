"use client";
import LoadingPage from "@/app/loading";
import DashboardCard from "@/components/ui/DashboardCard";
import { useGetAllAdminDashboardQuery } from "@/redux/features/admin/dashboardApi";

const AdminDashboard = () => {
  const { data: dashboad, isLoading } = useGetAllAdminDashboardQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
      {dashboad &&
        dashboad?.data?.map(
          (item: { label: string; value: number }, index: number) => (
            <DashboardCard key={index} label={item.label} value={item.value} />
          )
        )}
    </div>
  );
};

export default AdminDashboard;
