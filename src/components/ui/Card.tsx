import { TCardProps } from "@/type";
import Image from "next/image";

const Card = ({ img, title, details, btn, href }: TCardProps) => {
  return (
    <div className="card max-w-[380px] card-compact  bg-base-100 shadow-xl mx-auto">
      <figure>
        <Image
          src={img}
          alt={title || "card image"}
          width={400}
          height={250}
          className="bg-slate-100"
        />
      </figure>
      <div className="p-5 pb-8 ">
        {title && <h2 className="card-title font-bold">{title}</h2>}
        {details && <p className=" mt-3">{details}</p>}
        {btn && <button className="btn btn-outline mt-5">{btn}</button>}
      </div>
    </div>
  );
};

export default Card;
