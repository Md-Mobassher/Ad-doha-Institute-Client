"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";

import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <div className="flex lg:flex-row md:flex-row flex-col lg:justify-center lg:items-center">
      <Link
        href={"/donate"}
        className="lg:rounded-full lg:border-2 border-orange-200 lg:px-5 px-4 py-2 text-white hover:text-[#0F473C] inline hover:bg-[#F7F3E7] font-semibold"
      >
        ডোনেট
      </Link>

      {userInfo?.userId ? (
        <Link
          href={"/dashboard"}
          className="lg:rounded-full px-4 py-2 text-white hover:text-[#0F473C] inline hover:bg-[#F7F3E7] font-semibold"
        >
          ড্যাশবোর্ড
        </Link>
      ) : null}

      {userInfo?.userId ? (
        <h5
          onClick={() => handleLogOut()}
          className="lg:rounded-full px-4 py-2 text-white hover:text-[#0F473C]  hover:bg-[#F7F3E7] font-semibold cursor-pointer"
        >
          লগআউট
        </h5>
      ) : (
        <Link
          href={"/login"}
          className="lg:rounded-full px-4 py-2 text-white hover:text-[#0F473C] hover:bg-[#F7F3E7] font-semibold mt-1"
        >
          লগইন
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
