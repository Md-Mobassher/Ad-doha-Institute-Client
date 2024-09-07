import { Box, Stack, Typography } from "@mui/material";

const CourseTitle3 = ({ title }: { title?: string }) => {
  return (
    <>
      {title ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              height: "3px",
              bgcolor: "primary.main",
              width: "100%",
            }}
          ></Box>
          <Box width="100%">
            <Typography
              component="p"
              variant="h3"
              sx={{
                fontSize: {
                  lg: "24px",
                  md: "24px",
                  sm: "22px",
                  xs: "20px",
                  textAlign: "center",
                },
                fontWeight: "600",
                color: "primary.main",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "3px",
              bgcolor: "primary.main",
              width: "100%",
            }}
          ></Box>
        </Stack>
      ) : (
        <Box
          sx={{
            height: "3px",
            bgcolor: "primary.main",
            width: "200px",
          }}
        ></Box>
      )}
    </>
  );
};

export default CourseTitle3;
