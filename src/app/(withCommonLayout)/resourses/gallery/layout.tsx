import Sidebar from "@/components/shared/Sidebar";
import PageTitle from "@/components/ui/PageTitle";
import { gallerySidebarLink } from "@/data/gallery";

const Gallerylayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageTitle title="ছবি" />
      <div className="min-h-[500px] max-w-7xl mx-auto  rounded-box bg-green-50 border mt-10 mb-14">
        <div className="flex justify-between">
          <div className="lg:w-[18%] w-[20%] mt-3">
            <Sidebar items={gallerySidebarLink} />
          </div>

          <div className="lg:w-[82%] w-[80%]  bg-white my-5 lg:mr-5 mr-2 rounded-lg lg:p-2 p-0">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallerylayout;
