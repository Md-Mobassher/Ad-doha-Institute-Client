"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DohaContainer from "../DohaContainer";
import Title from "../Title";

interface Department {
  id: number;
  title: string;
  imageUrl: string;
}

const departments: Department[] = [
  { id: 1, title: "Al Quran", imageUrl: "/images/al-quran.png" },
  { id: 2, title: "Arabic Language", imageUrl: "/images/arabic-language.png" },
  { id: 3, title: "Diploma Courses", imageUrl: "/images/diploma-courses.png" },
  { id: 4, title: "Islami Aqeedah", imageUrl: "/images/islami-aqeedah.png" },
  { id: 5, title: "Hadith and Usul", imageUrl: "/images/hadith-usul.png" },
  { id: 6, title: "Islamic Studies", imageUrl: "/images/islamic-studies.png" },
  { id: 7, title: "Sanabiyyah", imageUrl: "/images/sanabiyyah.png" },
  { id: 8, title: "Kulliyyah", imageUrl: "/images/kulliyyah.png" },
  { id: 9, title: "Dakhil", imageUrl: "/images/dakhil.png" },
  { id: 10, title: "Alim", imageUrl: "/images/alim.png" },
  { id: 11, title: "Sister's", imageUrl: "/images/sisters.png" },
  { id: 12, title: "Children's", imageUrl: "/images/childrens.png" },
];

const DepartmentsSection: React.FC = () => {
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
          <Title title="আমাদের বিভাগসমূহ" />
        </Stack>

        <Grid
          container
          sx={{
            border: "1px solid #F3F7F8",
          }}
        >
          {departments.map((department) => (
            <Grid
              item
              xs={6}
              sm={3}
              md={2}
              lg={2}
              key={department.id}
              sx={{
                border: "0.5px solid #F3F7F6",
                ":hover": { cursor: "pointer" },
              }}
            >
              <Box className="flex flex-col items-center text-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={department.imageUrl}
                  alt={department.title}
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <Typography variant="h6" className="text-gray-800">
                  {department.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DohaContainer>
    </Box>
  );
};

export default DepartmentsSection;
