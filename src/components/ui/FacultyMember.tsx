"use client";

import { TMember } from "@/type";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FacultyMember = ({ image, name, designation, navigate }: TMember) => {
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
        backgroundColor: "secondary.main",
        boxShadow: "5 2 1",
        cursor: "pointer",
        ":hover": {
          border: "1px solid #22C55E",
        },
        p: "16px",
      }}
      onClick={() => handleClick()}
    >
      <Box
        sx={{
          width: "100%",
          "& img": {
            width: "200px",
            mb: "16px",
            mx: "auto",
            objectFit: "contain",
            borderTopRadius: "10px",
          },
        }}
      >
        <Image
          src={image}
          alt={name}
          className="rounded-t-lg"
          width={500}
          height={400}
        />
      </Box>

      <Box>
        <Typography
          component="h3"
          variant="h3"
          fontSize={{
            lg: "20px",
            md: "19px",
            sm: "18px",
            xs: "17px",
          }}
          color="primary.main"
          textAlign="center"
          pb={"12px"}
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

export default FacultyMember;
