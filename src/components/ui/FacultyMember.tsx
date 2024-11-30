"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CardTitle from "./CardTitle";
import CardSubTitle from "./CardSubTitle";
import { TTeacher } from "@/type";

const FacultyMember = ({ image, name, designation, navigate }: TTeacher) => {
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
        <CardTitle title={name} />
        <CardSubTitle title={designation} />
      </Box>
    </Box>
  );
};

export default FacultyMember;
