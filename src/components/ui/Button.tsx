"use client";

import { TButtonProps } from "@/type";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const Button = ({ title, id, navigate }: TButtonProps) => {
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-outline bg-primary text-white hover:bg-secondary transition-all duration-300 rounded-3xl px-6 mt-5 "
        onClick={() => router.push(`/${navigate}/${id}`)}
      >
        {title} <FaArrowRight className="ml-2" />
      </button>
    </>
  );
};

export default Button;
