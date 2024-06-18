import { TBook } from "@/type";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const DohaBook = ({ image, title, url }: TBook) => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      mb={1}
      component={Link}
      href={url}
      target="_blank"
      sx={{
        borderRadius: "10px",
        border: "1px solid lightgray",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "5 2 1",
        ":hover": {
          border: "1px solid #22C55E",
        },
        p: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          "& img": {
            width: "95%",
            height: "100%",
            overflow: "hidden",
            objectFit: "cover",
            borderBottom: "1px solid lightgray",
            borderTopRadius: "10px",
            mx: "auto",
            pb: "10px",
          },
        }}
      >
        <Image
          src={image}
          alt={title || "Book image"}
          width={200}
          height={400}
        />
      </Box>
      <Box>
        <Typography
          component="h4"
          fontSize="18px"
          textAlign="center"
          my="6px"
          fontWeight="700"
          color="primary.main"
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  );
};

export default DohaBook;
