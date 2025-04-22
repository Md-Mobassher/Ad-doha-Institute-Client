"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import CourseTitle3 from "../courses/components/CourseTitle3";
import { TDepartment } from "@/type";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAllAcademicDepartmentsQuery } from "@/redux/features/admin/departmentManagementApi";
import LoadingPage from "@/app/loading";
import { Alert } from "@mui/material"; // For displaying error alerts

const DepartmentsSection: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const { data, isLoading, isError } = useGetAllAcademicDepartmentsQuery({});

  const departmentData = data?.data || [];

  const handleDepartmentClick = (departmentId: string) => {
    router.push(`/courses?departmentId=${departmentId}`);
  };

  return (
    <Box sx={{ backgroundColor: "info.main" }}>
      <DohaContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
          gap={2}
        >
          <Title title={t("departmentSec.title")} />
          <CourseTitle3 />
        </Stack>

        <Box sx={{ flexGrow: 1, p: 2 }} width="100%">
          {/* Show loading or error message */}
          {isLoading ? (
            <LoadingPage />
          ) : isError ? (
            <Alert severity="error">
              Failed to load departments. Please try again later.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {departmentData?.map((department: TDepartment) => (
                <Grid
                  key={department._id}
                  {...{ xs: 6, sm: 4, md: 2.4, lg: 2.4, xl: 2.4 }}
                  minHeight={160}
                  mx={"auto"}
                  sx={{
                    "--Grid-borderWidth": "1px",
                    borderTop: "var(--Grid-borderWidth) solid",
                    borderLeft: "var(--Grid-borderWidth) solid",
                    borderColor: "divider",
                    "& > div": {
                      borderRight: "var(--Grid-borderWidth) solid",
                      borderBottom: "var(--Grid-borderWidth) solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <Box
                    className="text-center lg:p-5 md:p-4 p-2 bg-white cursor-pointer h-full"
                    onClick={() => handleDepartmentClick(department._id)}
                    role="button"
                    aria-label={`Go to courses for ${department.name}`}
                  >
                    <Box className="hover:scale-110 transition-all duration-300 flex flex-col items-center">
                      <Image
                        src={department.image}
                        alt={department.name || "Department Image"}
                        width={80}
                        height={80}
                        className="mb-4"
                      />
                      <Typography
                        component="p"
                        sx={{
                          color: "primary.main",
                          boxShadow: "none",
                          fontSize: {
                            lg: "16px",
                            md: "15px",
                            sm: "14px",
                            xs: "14px",
                          },
                          fontWeight: 600,
                          px: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {department.name || "Unnamed Department"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default DepartmentsSection;
