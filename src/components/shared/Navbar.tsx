import Link from "next/link";
import NavItems from "./NavItem";
import { FaFacebookF, FaMobileAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineYoutube } from "react-icons/ai";
import Image from "next/image";
import assets from "@/assets";

const Navbar = () => {
  return (
    <>
      {/* header top */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex  justify-between items-center ">
            <div className="flex items-center text-sm ">
              <div className="flex justify-center items-center lg:gap-2 gap-1">
                <FaMobileAlt /> <p>+88 01916016099</p>
              </div>
              <div className="divider divider-horizontal  m-0 p-0 "></div>
              <div className="flex justify-center items-center lg:gap-2 gap-1">
                <HiOutlineMail className="size-5" /> <p>info@ad-doha.org​</p>
              </div>
            </div>

            <div className="flex ">
              <div className="divider divider-horizontal  m-0 p-0 w-0"></div>
              <Link href="https://www.facebook.com/addoha.org" target="_blank">
                <div className="w-8 h-8 flex justify-center items-center hover:bg-green-500 hover:text-white">
                  <FaFacebookF />
                </div>
              </Link>

              <div className="divider divider-horizontal  m-0 p-0 w-0"></div>

              <Link
                href="https://www.youtube.com/channel/UC6m__rWQY4zybxI3r14mPVg"
                target="_blank"
              >
                <div className="w-8 h-8 flex justify-center items-center hover:bg-green-500 hover:text-white">
                  <AiOutlineYoutube />
                </div>
              </Link>

              <div className="divider m-0 p-0 w-0 divider-horizontal"></div>
            </div>
          </div>
        </div>
      </div>

      {/* header */}
      <header className=" sticky top-0 z-50 bg-white border-b border-t shadow-sm">
        <div className="flex bg-white  m-0 justify-between items-center  max-w-7xl mx-auto px-4 lg:gap-5 gap-2 ">
          <div className="flex-1 text-4xl font-semibold">
            <Link href="/">
              <Image
                src={assets.logo.headerlogo}
                width={250}
                height={50}
                alt="logo"
              />
            </Link>
          </div>
          <NavItems />
        </div>
      </header>
    </>
  );
};

export default Navbar;
