"use client";

import { TButtonProps } from "@/type";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const Button = ({ btnTitle, id, navigate }: TButtonProps) => {
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
        <button
          className="btn btn-outline bg-primary text-white hover:bg-secondary transition-all duration-300 rounded-3xl px-5 "
          onClick={handleClick}
        >
          {btnTitle} <FaArrowRight className=" ml-1" />
        </button>
      )}
    </>
  );
};

export default Button;
