"use client";
import LoadingPage from "@/app/loading";
import DashboardCard from "@/components/ui/DashboardCard";
import { useGetAllAdminDashboardQuery } from "@/redux/features/admin/dashboardApi";
import { dashboardIconMap } from "./profile/components/dashboardIconMap";
import { selectCurrentProfile } from "@/redux/features/myProfile/profileSlice";
import { useAppSelector } from "@/redux/hooks";

const AdminDashboard = () => {
  const { data: dashboard, isLoading } = useGetAllAdminDashboardQuery({});
  const profile = useAppSelector(selectCurrentProfile);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className=" py-5 flex flex-col gap-5">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 ">
        👋 Welcome back, {profile?.fullName || "Admin"}!
      </h2>
      <p className="text-gray-500 pb-2">Here’s what’s happening at a glance.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {dashboard?.data?.map(
          (item: { label: string; value: number }, index: number) => {
            const iconData = dashboardIconMap[item.label] || {};
            return (
              <DashboardCard
                key={index}
                label={item.label}
                value={item.value}
                icon={iconData.icon}
                iconBgColor={iconData.iconBgColor}
              />
            );
          }
        )}
      </div>

      {/* Recent Activity */}
      {/* <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>📌 New course “AI Basics” added by Faculty A</li>
          <li>✅ Student John Doe enrolled in “Database 101”</li>
          <li>📬 3 new contact form submissions</li>
        </ul>
      </div> */}

      {/* Quick link */}
      {/* <div className="col-span-full md:col-span-2 mt-5 md:mt-8">
        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            ➕ Add Course
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            👨‍🏫 Manage Faculty
          </button>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded">
            📚 View Enrollments
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
