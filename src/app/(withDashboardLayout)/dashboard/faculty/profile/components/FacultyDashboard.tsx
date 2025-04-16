"use client";
import { useGetMYProfileQuery } from "@/redux/features/myProfile";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { FaUserGraduate, FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import avatar from "@/assets/avatar.webp";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: myprofile, isLoading } = useGetMYProfileQuery(undefined);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className=" space-y-6 py-5 ">
      {/* Profile Card */}
      <Card className="w-full shadow-md" sx={{ borderRadius: 3 }}>
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar
            alt="Faculty Avatar"
            src={myprofile?.data?.profileImg || avatar}
            sx={{ width: 80, height: 80 }}
          />
          <div className="text-center md:text-left">
            <Typography variant="h5" className="text-gray-800">
              {isLoading ? "Loading" : `${myprofile?.data?.fullName}`}
            </Typography>
            <Typography variant="h6" className="text-gray-600 mt-1">
              {isLoading ? "Loading" : `Faculty ID: ${myprofile?.data?.id}`}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {[
          {
            label: "Total Courses",
            value: 0,
            icon: <FaBookOpen className="text-indigo-500 text-3xl" />,
          },
          {
            label: "Upcoming Classes",
            value: 0,
            icon: <FaCalendarAlt className="text-green-500 text-3xl" />,
          },
          {
            label: "Total Student",
            value: 0,
            icon: <FaUserGraduate className="text-yellow-500 text-3xl" />,
          },
        ].map((item, idx) => (
          <Card key={idx} className="shadow-md" sx={{ borderRadius: 3 }}>
            <CardContent className="flex items-center gap-5 p-5">
              {item.icon}
              <div>
                <Typography variant="h6" className="text-gray-500">
                  {item.label}
                </Typography>
                <Typography variant="h6" className="font-bold text-gray-800">
                  {item.value}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Card className="shadow-md" sx={{ borderRadius: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className="border-b px-4"
        >
          <Tab label="Enrolled Courses" />
          <Tab label="Class Schedule" />
          <Tab label="Total Student" />
        </Tabs>
        <CardContent>
          {activeTab === 0 && (
            <div>📚 List of enrolled courses will appear here.</div>
          )}
          {activeTab === 1 && (
            <div>🗓️ Upcoming class schedule will be displayed.</div>
          )}
          {activeTab === 2 && (
            <div>📊 Semester-wise Student and result breakdown.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
