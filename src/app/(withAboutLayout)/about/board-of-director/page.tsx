import Image from "next/image";
import commingSoon from "@/assets/comingsoon.png";

const BoardOfDirectorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Image src={commingSoon} alt="coming soon image" />
    </div>
  );
};

export default BoardOfDirectorPage;
