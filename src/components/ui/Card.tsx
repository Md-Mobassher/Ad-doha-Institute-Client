import { TCardProps } from "@/type";
import Image from "next/image";

const Card = ({ image, title, details, btn, href }: TCardProps) => {
  return (
    <div className="rounded-lg bg-base-100 shadow-xl mx-auto border">
      <div className=" border-b flex justify-center items-center">
        <Image
          src={image}
          alt={title || "card image"}
          width={350}
          height={250}
          className="bg-white p-2"
        />
      </div>
      <div className="p-5 ">
        {title && <h2 className="card-title font-bold">{title}</h2>}
        {details && <p className=" mt-3">{details}</p>}

        <button className="btn btn-outline mt-5">{btn || "Details"}</button>
      </div>
    </div>
  );
};

export default Card;
