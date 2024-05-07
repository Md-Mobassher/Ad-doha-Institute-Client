import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="">
      <div className="">
        <ul className="menu  min-h-[500px] w-full mt-2">
          <li className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 font-semibold">
            <Link href="/about/aims-&-objectives">Aims & Objectives</Link>
          </li>
          <li className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 font-semibold">
            <Link href="/about/futureplan">Our Future Plan</Link>
          </li>
          <li className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 font-semibold">
            <Link href="/about/board-of-director">Board of Directors </Link>
          </li>
          <li className="w-full hover:bg-primary text-black hover:text-white rounded-lg  py-1 font-semibold">
            <Link href="/about/advisory-committee">Advisory Committee </Link>
          </li>
          <li className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 font-semibold">
            <Link href="/about/faculty">Faculty </Link>
          </li>
        </ul>
      </div>

      <div className="divider divider-horizontal h-[98%] mt-2"></div>
    </div>
  );
};

export default Sidebar;
