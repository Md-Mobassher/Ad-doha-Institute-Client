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
      className="border hover:border-primary shadow-lg rounded-lg hover:shadow-2xl hover:cursor-pointer"
      onClick={() => handleClick()}
    >
      <Box>
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
