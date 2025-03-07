"use client";

import { TButtonProps } from "@/type";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const DohaButton = ({ btnTitle, id, navigate, variant }: TButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (id) {
      router.push(`/${navigate}/${id}`);
    } else {
      router.push(`/${navigate}`);
    }
  };

  return (
    <>
      {btnTitle && (
        <Button
          sx={{
            borderRadius: "50px",
            backgroundColor: "secondary.main",
            color: "primary.main",
            border: "2px solid #0F473C",
            px: { lg: "16px", md: "14px", sm: "12px", xs: "10px" },
            py: {
              lg: "4px",
              md: "4px",
              sm: "3px",
              xs: "3px",
            },
            ":hover": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
            fontSize: {
              lg: "16px",
              md: "15px",
              sm: "14px",
              xs: "14px",
            },
            fontWeight: 600,
          }}
          onClick={handleClick}
        >
          {btnTitle}

          <FaArrowRight className=" md:ml-2 ml-1" />
        </Button>
      )}
    </>
  );
};

export default DohaButton;
