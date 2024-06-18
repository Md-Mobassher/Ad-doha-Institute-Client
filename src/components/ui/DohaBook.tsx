import { TBook } from "@/type";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const DohaBook = ({ image, title, url }: TBook) => {
  return (
    <Box
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
        p: "5px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 300,
          "& img": {
            width: "90%",
            height: "100%",
            overflow: "hidden",
            objectFit: "cover",
            borderBottom: "1px solid lightgray",
            borderTopRadius: "10px",
            mx: "auto",
            py: 2,
          },
        }}
      >
        <Image
          src={image}
          alt={title || "Book image"}
          width={200}
          height={280}
          className="bg-white rounded-t-lg"
        />
      </Box>
      <Box>
        <Typography
          component="h6"
          textAlign="center"
          my="8px"
          fontWeight="700"
          color="primary.main"
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default DohaBook;
