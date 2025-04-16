// dashboardIconMap.ts
import React from "react";
import {
  FaUserShield,
  FaUsers,
  FaUserGraduate,
  FaUniversity,
  FaBookOpen,
  FaClipboardList,
  FaComments,
  FaUserFriends,
  FaBook,
  FaVideo,
  FaEnvelopeOpen,
  FaMailBulk,
} from "react-icons/fa";

export const dashboardIconMap: Record<
  string,
  { icon: JSX.Element; iconBgColor: string }
> = {
  "Total Admins": {
    icon: React.createElement(FaUserShield),
    iconBgColor: "bg-indigo-100 text-indigo-600",
  },
  "Total Faculty": {
    icon: React.createElement(FaUsers),
    iconBgColor: "bg-purple-100 text-purple-600",
  },
  "Total Students": {
    icon: React.createElement(FaUserGraduate),
    iconBgColor: "bg-green-100 text-green-600",
  },
  "Total Departments": {
    icon: React.createElement(FaUniversity),
    iconBgColor: "bg-yellow-100 text-yellow-600",
  },
  "Total Courses": {
    icon: React.createElement(FaBookOpen),
    iconBgColor: "bg-blue-100 text-blue-600",
  },
  "Total Enrolled Courses": {
    icon: React.createElement(FaClipboardList),
    iconBgColor: "bg-teal-100 text-teal-600",
  },
  "Total Opinions": {
    icon: React.createElement(FaComments),
    iconBgColor: "bg-pink-100 text-pink-600",
  },
  "Total Advisory Committee": {
    icon: React.createElement(FaUserFriends),
    iconBgColor: "bg-rose-100 text-rose-600",
  },
  "Total Book": {
    icon: React.createElement(FaBook),
    iconBgColor: "bg-amber-100 text-amber-600",
  },
  "Total Video": {
    icon: React.createElement(FaVideo),
    iconBgColor: "bg-red-100 text-red-600",
  },
  "Total Subscribers": {
    icon: React.createElement(FaEnvelopeOpen),
    iconBgColor: "bg-lime-100 text-lime-600",
  },
  "Total Contacts": {
    icon: React.createElement(FaMailBulk),
    iconBgColor: "bg-sky-100 text-sky-600",
  },
};
