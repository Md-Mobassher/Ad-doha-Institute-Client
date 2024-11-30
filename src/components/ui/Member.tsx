"use client";

import { TTeacher } from "@/type";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CardTitle from "./CardTitle";
import CardSubTitle from "./CardSubTitle";

const Member = ({ image, name, designation, navigate }: TTeacher) => {
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
      }}
      onClick={() => handleClick()}
    >
      <Box
        sx={{
          width: "100%",
          "& img": {
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

      <Box p={2}>
        <CardTitle title={name} />
        <CardSubTitle title={designation} />
      </Box>
    </Box>
  );
};

export default Member;
