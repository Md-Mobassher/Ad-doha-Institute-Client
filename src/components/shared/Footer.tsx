import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-2  border-t  overflow-hidden bg-slate-100">
      <div className="max-w-7xl mx-auto p-5 flex lg:justify-between justify-center items-center">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()} All right regerved to{" "}
          <span>Ad-doha Institute</span>
        </p>
        <p className="text-center">
          Design & Developed by Developer{" "}
          <a
            href="https://dev-mobassher.web.app"
            target="_blank"
            rel="noreferrer"
            className="text-green-500"
          >
            Md Mobassher Hossain
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
