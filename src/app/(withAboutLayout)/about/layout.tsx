import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import DohaContainer from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { aboutSidebarLink } from "@/data/about";
import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad-doha About",
  description: "This is about page of Ad-doha Institute",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <PageTitle title="আমাদের সম্পর্কে" />
      <DohaContainer>
        <Box
          sx={{
            border: "1px solid lightgray",
            backgroundColor: "lightgrey",
            borderRadius: "10px",
            p: "15px",
            mt: "-35px",
          }}
        >
          <Stack
            justifyContent={{
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "start",
            }}
            direction={{
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            }}
          >
            <Box width={{ lg: "18%", md: "18%", sm: "20%", xs: "100%" }}>
              <Sidebar items={aboutSidebarLink} />
            </Box>

            <Box
              width={{ lg: "82%", md: "82%", sm: "80%", xs: "100%" }}
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
              m="0px"
            >
              {children}
            </Box>
          </Stack>
        </Box>
      </DohaContainer>
      <Footer />
    </>
  );
}
