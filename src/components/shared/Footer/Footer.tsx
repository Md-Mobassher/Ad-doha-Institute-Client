import Container from "@/components/ui/Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-2  border-t  overflow-hidden bg-slate-100">
      <div className="max-w-7xl mx-auto p-5 flex flex-wrap lg:justify-between justify-center items-center">
        <p className="text-center">
          স্বত্ব &copy; {new Date().getFullYear()} | আদ-দোহা ইনস্টিটিউট, সর্ব
          স্বত্ব সংরক্ষিত
        </p>
        <p className="text-center">
          কারিগরি সহায়তায়{" "}
          <Link
            href="https://dev-mobassher.web.app"
            target="_blank"
            rel="noreferrer"
            className="text-green-500"
          >
            মোঃ মোবাশ্বের হোসেন
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
