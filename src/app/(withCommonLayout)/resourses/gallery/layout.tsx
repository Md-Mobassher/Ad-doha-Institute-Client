import Sidebar from "@/components/shared/Sidebar";
import PageTitle from "@/components/ui/PageTitle";
import { gallerySidebarLink } from "@/data/gallery";

const Gallerylayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageTitle title="ছবি" />
      <div className="min-h-[500px] max-w-7xl mx-auto  rounded-box bg-green-50 border mt-10 mb-14">
        <div className="flex justify-between">
          <div className="w-[18%]">
            <Sidebar items={gallerySidebarLink} />
          </div>

          <div className="lg:w-[82%] w-[80%]  bg-white my-3 rounded-lg lg:p-2 p-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallerylayout;
