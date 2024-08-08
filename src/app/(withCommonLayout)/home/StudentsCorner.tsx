"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";

interface IStudentsCorner {
  id: number;
  title: string;
  imageUrl: string;
}

const studentsCorner: IStudentsCorner[] = [
  {
    id: 1,
    title: "সহিহ কুরআন শিক্ষা",
    imageUrl: assets.departments.quranShikkha,
  },
  {
    id: 2,
    title: "মৌলিক ইসলাম শিক্ষা",
    imageUrl: assets.departments.islamShikkha,
  },
  {
    id: 3,
    title: "তুলনামূলক ধর্মতত্ত্ব",
    imageUrl: assets.departments.dhormototto,
  },
  {
    id: 4,
    title: "ইংরেজি ভাষা শিক্ষা",
    imageUrl: assets.departments.englishLanguage,
  },
  { id: 5, title: "ইসলামি নাশিদ", imageUrl: assets.departments.islamiNashid },
];

const StudentsCornerSection: React.FC = () => {
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
            {studentsCorner.map((item, index) => (
              <Grid
                key={index}
                {...{ xs: 6, sm: 6, md: 2.4, lg: 2.4, xl: 2.4 }}
                minHeight={160}
              >
                <Box className="  text-center p-5 bg-white cursor-pointer">
                  <Box className="hover:scale-110 transition-all duration-300 flex flex-col items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="mb-4 "
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "primary.main",
                        boxShadow: "none",
                        fontSize: "15px",
                        fontWeight: 500,
                        px: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.title}
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
