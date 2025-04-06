"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import CourseTitle3 from "../courses/components/CourseTitle3";
import { IDepartment } from "@/type";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const DepartmentsSection: React.FC = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const t = useTranslations("HomePage");

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/academic-departments`
      );
      const { data } = await res.json();
      setDepartments(data || []);
    };

    fetchDepartments();
  }, []);

  const handleDepartmentClick = (departmentId: string) => {
    router.push(`/courses?departmentId=${departmentId}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
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
          <Grid container spacing={2}>
            {departments.map((department: IDepartment) => (
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
                >
                  <Box className="hover:scale-110 transition-all duration-300 flex flex-col items-center">
                    <Image
                      src={department.image}
                      alt={department.name}
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
                      {department.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default DepartmentsSection;
