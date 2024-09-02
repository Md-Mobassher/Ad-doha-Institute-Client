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
    <div className="flex lg:flex-row md:flex-row flex-col lg:space-x-3 md:space-x-1">
      <Link
        href={"/donate"}
        className="p-2 text-white hover:text-[#0F473C] block hover:bg-[#F7F3E7] font-semibold"
      >
        ডোনেট
      </Link>

      {userInfo?.userId ? (
        <Link
          href={"/dashboard"}
          className="p-2 text-white hover:text-[#0F473C] block hover:bg-[#F7F3E7] font-semibold"
        >
          ড্যাশবোর্ড
        </Link>
      ) : null}

      {userInfo?.userId ? (
        <h5
          onClick={() => handleLogOut()}
          className="p-2 text-white hover:text-[#0F473C] block hover:bg-[#F7F3E7] font-semibold"
        >
          লগআউট
        </h5>
      ) : (
        <Link
          href={"/login"}
          className="p-2 text-white hover:text-[#0F473C] block hover:bg-[#F7F3E7] font-semibold"
        >
          লগইন
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
