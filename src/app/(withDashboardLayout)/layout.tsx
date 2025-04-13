import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad-doha Institute",
  description:
    "Ad-doha Institute; An educational, research, dawah and service institution.",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
