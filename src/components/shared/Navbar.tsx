import Link from "next/link";
import NavItems from "./NavItem";
import { FaFacebookF, FaLinkedinIn, FaMobileAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";

const Navbar2 = () => {
  return (
    <>
      {/* header top */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex  justify-between items-center ">
          <div className="flex items-center text-sm ">
            <div className="flex justify-center items-center lg:gap-2 gap-1">
              <FaMobileAlt /> <p> +880-1706060647</p>
            </div>
            <div className="divider divider-horizontal  m-0 p-0 "></div>
            <div className="flex justify-center items-center lg:gap-2 gap-1">
              <MdOutlineLocationOn className="size-5" />{" "}
              <p>House- 22, Tograihat, Rajarhat, Kurigram-5600</p>
            </div>
          </div>

          <div className="flex ">
            <div className="divider divider-horizontal  m-0 p-0 w-0"></div>
            <Link href="/">
              <div className="w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white">
                <FaFacebookF />
              </div>
            </Link>

            <div className="divider divider-horizontal  m-0 p-0 w-0"></div>

            <Link href="/">
              <div className="w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white">
                <FaLinkedinIn />
              </div>
            </Link>

            <div className="divider divider-horizontal  m-0 p-0 w-0"></div>

            <Link href="/">
              <div className="w-8 h-8 flex justify-center items-center hover:bg-primary hover:text-white">
                <AiOutlineYoutube />
              </div>
            </Link>

            <div className="divider m-0 p-0 w-0 divider-horizontal"></div>
          </div>
        </div>
      </div>

      {/* header */}
      <header className=" sticky top-0 z-50 bg-white border-b border-t">
        <div className="flex bg-white  m-0 justify-between items-center h-14 max-w-7xl mx-auto px-4 lg:gap-5 gap-2 ">
          <div className="flex-1 text-4xl font-semibold">
            <Link href="/">Mobassher</Link>
          </div>
          <NavItems />
        </div>
      </header>
    </>
  );
};

export default Navbar2;
