"use client";
import { TMember } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Member = ({ image, name, designation, navigate }: TMember) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(navigate as string);
  };
  return (
    <div
      className="border hover:border-primary shadow-lg rounded-lg hover:shadow-2xl hover:cursor-pointer"
      onClick={() => handleClick()}
    >
      <div>
        <Image src={image} alt={name} className="rounded-t-lg" />
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold mb-2 text-primary">{name}</h3>
        <h5 className="text-sm">{designation}</h5>
      </div>
    </div>
  );
};

export default Member;
