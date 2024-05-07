import { FaHandPointRight } from "react-icons/fa";

type detailItemProps = {
  index: number;
  item: string;
};

const DetailsItem = ({ item, index }: detailItemProps) => {
  return (
    <>
      {index > 0 && <hr className="border-slate-300" />}
      <div className="flex justify-start items-center gap-4 text-md hover:text-primary my-2 hover:font-semibold">
        <div>
          <FaHandPointRight className="lg:size-8 md:size-7 size-5" />
        </div>
        <div>
          <p>{item}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsItem;
