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
            px: "16px",
            py: "4px",
            ":hover": {
              backgroundColor: "primary.main",
              color: "#fff",
            },
            fontSize: {
              lg: "16px",
              md: "16px",
              sm: "16px",
              xs: "15px",
            },
            fontWeight: 600,
          }}
          onClick={handleClick}
        >
          {btnTitle}

          <FaArrowRight className=" ml-2" />
        </Button>
      )}
    </>
  );
};

export default DohaButton;
