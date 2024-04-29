import { FaArrowRight } from "react-icons/fa";

const Button = ({ title }: { title: string }) => {
  return (
    <button
      className="btn btn-outline bg-green-400 text-white hover:bg-green-500 transition-all duration-300 rounded-3xl px-6 "
      // onClick={() => router.push(`/courses`)}
    >
      {title} <FaArrowRight className="ml-2" />
    </button>
  );
};

export default Button;
