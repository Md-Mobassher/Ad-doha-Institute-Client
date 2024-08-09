"use client";

import { TMember } from "@/type";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Member = ({ image, name, designation, navigate }: TMember) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(navigate as string);
  };
  return (
    <Box
      sx={{
        borderRadius: "10px",
        border: "1px solid lightgray",
        width: "100%",
        maxWidth: "400px",
        height: "100%",
        mx: "auto",
        backgroundColor: "#fff",
        boxShadow: "5 2 1",
        cursor: "pointer",
        ":hover": {
          border: "1px solid #22C55E",
        },
      }}
      onClick={() => handleClick()}
    >
      <Box
        sx={{
          width: "100%",
          height: 250,
          "& img": {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            objectFit: "cover",
            borderBottom: "1px solid lightgray",
            borderTopRadius: "10px",
          },
        }}
      >
        <Image
          src={image}
          alt={name}
          className="rounded-t-lg"
          width={380}
          height={400}
        />
      </Box>

      <Box p={2}>
        <Typography
          component="h3"
          variant="h3"
          fontSize={{
            lg: "20px",
            md: "19px",
            sm: "18px",
            xs: "17px",
          }}
          mb="10px"
          color="primary.main"
          textAlign="center"
        >
          {name}
        </Typography>
        <Typography
          component="p"
          fontSize={{
            lg: "15px",
            md: "15px",
            sm: "14px",
            xs: "14px",
          }}
          fontWeight="400"
          textAlign="center"
          color="warning.main"
        >
          {designation}
        </Typography>
      </Box>
    </Box>
  );
};

export default Member;
