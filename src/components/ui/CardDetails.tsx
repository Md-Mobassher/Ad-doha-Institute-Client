import Container from "./Container";
import Image from "next/image";
import DetailsItem from "./DetailsItem";
import { TCardDetails } from "@/type";
import PageTitle from "./PageTitle";
import Button from "./Button";
import Link from "next/link";

const CardDetails = ({
  image,
  description,
  title,
  btnTitle,
  link,
}: TCardDetails) => {
  return (
    <>
      <PageTitle title={`${title}`} />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="flex flex-wrap-reverse mt-8 border border-primary rounded-lg min-h-80 lg:p-8 p-5">
            <div className="lg:w-[65%] md:w-[65%] w-full lg:mt-0 mt-5">
              {description?.map((item, index) => (
                <DetailsItem key={index} item={item} index={index} />
              ))}
              <div>
                {btnTitle && link && (
                  <Link href={link as string}>
                    <Button btnTitle={btnTitle || "Details"} />
                  </Link>
                )}
              </div>
            </div>
            <div className="lg:w-[35%] md:w-[35%] w-full">
              <Image src={image} alt={title} className="mx-auto" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CardDetails;
