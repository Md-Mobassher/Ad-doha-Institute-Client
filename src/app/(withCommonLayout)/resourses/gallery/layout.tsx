import Sidebar from "@/components/shared/Sidebar";
import PageTitle from "@/components/ui/PageTitle";
import { gallerySidebarLink } from "@/data/gallery";

const Gallerylayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageTitle title="Gallery" />
      <div className="min-h-[500px] max-w-7xl mx-auto px-4  rounded-box bg-green-50 border mt-10 mb-14">
        <div className="flex justify-between">
          <div className="w-[18%]">
            <Sidebar items={gallerySidebarLink} />
          </div>

          <div className="w-[82%]  bg-white my-3 rounded-lg p-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallerylayout;
