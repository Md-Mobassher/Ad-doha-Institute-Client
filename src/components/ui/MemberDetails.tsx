import { TMember } from "@/type";
import Image from "next/image";

const MemberDetails = ({ image, name, designation }: TMember) => {
  return (
    <div className=" lg:flex md:flex justify-between items-center gap-10">
      <div className="w-full">
        {image && (
          <Image
            src={image}
            alt={name}
            className="rounded-lg border"
            width={600}
            height={500}
          />
        )}
      </div>

      <div className=" w-full lg:mt-0 mt-5">
        <h3 className="lg:text-2xl text-xl text-primary font-bold mb-4 text-center md:text-start lg:text-start xl:text-start">
          {name}
        </h3>
        <h5 className="text-md text-center md:text-start lg:text-start xl:text-start">
          {designation}
        </h5>
      </div>
    </div>
  );
};

export default MemberDetails;
