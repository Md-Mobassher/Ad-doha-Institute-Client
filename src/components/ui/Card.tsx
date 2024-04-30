import { TCardProps } from "@/type";
import Image from "next/image";

const Card = ({ image, title, details, btn, href }: TCardProps) => {
  return (
    <div className="card  card-compact  bg-base-100 shadow-xl mx-auto border">
      <div className=" border-b">
        <figure>
          <Image
            src={image}
            alt={title || "card image"}
            width={300}
            height={300}
            className="bg-slate-100"
          />
        </figure>
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
