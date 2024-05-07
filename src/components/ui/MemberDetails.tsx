import { TMember } from "@/type";
import Image from "next/image";

const MemberDetails = ({ image, name, designation, details }: TMember) => {
  return (
    <div className=" lg:flex md:flex justify-between items-center gap-5">
      <div>
        <Image src={image} alt={name} className="rounded-lg" />
      </div>

      <div className="w-[50%]">
        <h3 className="text-2xl text-primary font-bold mb-4">{name}</h3>
        <h5 className="text-md">{designation}</h5>
        <h2>{details}</h2>
      </div>
    </div>
  );
};

export default MemberDetails;
