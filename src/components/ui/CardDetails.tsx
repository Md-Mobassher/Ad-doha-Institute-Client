import Container from "./Container";
import Image from "next/image";
import DetailsItem from "./DetailsItem";
import { TCardDetails } from "@/type";
import PageTitle from "./PageTitle";

const CardDetails = ({ image, description, title }: TCardDetails) => {
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
