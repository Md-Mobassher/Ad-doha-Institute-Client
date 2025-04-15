import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DohaContainer from "@/components/ui/DohaContainer";
import { TDepartment } from "@/type";
import Title from "@/components/ui/Title";

const StudentsCornerSection: React.FC = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/academic-departments`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  const departments = (data as TDepartment[]) || [];
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
        >
          <Title title="শিক্ষার্থী কর্ণার" />
        </Stack>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
            container
            spacing={2}
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
            {departments &&
              departments?.map((department: TDepartment) => (
                <Grid
                  key={department?._id}
                  {...{ xs: 6, sm: 4, md: 2.4, lg: 2.4, xl: 2.4 }}
                  minHeight={160}
                >
                  <Box className="  text-center p-5 bg-white cursor-pointer">
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
                          fontSize: "16px",
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

export default StudentsCornerSection;
