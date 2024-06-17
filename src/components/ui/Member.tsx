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
        height: "100%",
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
          fontSize={{
            lg: "20px",
            md: "19px",
            sm: "18px",
            xs: "17px",
          }}
          component="h3"
          fontWeight="600"
          mb="8px"
          color="primary.main"
        >
          {name}
        </Typography>
        <Typography
          fontSize={{
            lg: "17px",
            md: "16px",
            sm: "15px",
            xs: "14px",
          }}
          component="p"
          fontWeight="400"
        >
          {designation}
        </Typography>
      </Box>
    </Box>
  );
};

export default Member;
