"use client";

import { TButtonProps } from "@/type";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const DohaButton = ({ btnTitle, id, navigate }: TButtonProps) => {
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
            backgroundColor: "primary.main",
            color: "#FFF",
            borderRadius: "8px",
          }}
          onClick={handleClick}
        >
          {btnTitle} <FaArrowRight className=" ml-2" />
        </Button>
      )}
    </>
  );
};

export default DohaButton;
