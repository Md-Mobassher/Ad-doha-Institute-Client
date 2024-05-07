import { TCardProps } from "@/type";
import Image from "next/image";
import Button from "./Button";

const Card = ({
  image,
  title,
  details,
  btnTitle,
  id,
  navigate,
}: TCardProps) => {
  return (
    <div className="rounded-lg w-full h-full bg-base-100 shadow-md mx-auto border hover:border-primary hover:shadow-xl transition-all duration-500">
      <div className=" border-b flex justify-center items-center">
        <Image
          src={image}
          alt={title || "card image"}
          width={300}
          height={200}
          className="bg-white rounded-t-lg"
        />
      </div>
      <div className="p-5 ">
        {title && (
          <h2 className="card-title text-primary font-bold mb-3">{title}</h2>
        )}
        {details && (
          <p className=" mb-3 text-justify">{details.slice(0, 120)}...</p>
        )}

        {btnTitle && (
          <Button
            btnTitle={btnTitle || "Details"}
            id={id}
            navigate={navigate}
            title={title}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
