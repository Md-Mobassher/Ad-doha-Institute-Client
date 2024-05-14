import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { Container } from "@mui/material";

const ResourcesPage = () => {
  return (
    <>
      <PageTitle title="রিসোর্স" />

      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          <Link href="/resourses/books">
            <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
              <div className="flex justify-center items-center p-3">
                <IoBookSharp size={250} className="text-primary" />
              </div>
              <div>
                <hr />
                <p className="text-center my-3 text-primary text-2xl font-bold">
                  বই
                </p>
              </div>
            </div>
          </Link>
          <Link href="/resourses/videos">
            <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
              <div className="flex justify-center items-center p-3">
                <IoMdVideocam size={250} className="text-primary" />
              </div>
              <div>
                <hr />
                <p className="text-center my-3 text-primary text-2xl font-bold">
                  ভিডিও
                </p>
              </div>
            </div>
          </Link>
          <Link href="/resourses/gallery">
            <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
              <div className="flex justify-center items-center p-3">
                <GrGallery size={220} className="text-primary" />
              </div>
              <div>
                <hr />
                <p className="text-center my-3 text-primary text-2xl font-bold">
                  গ্যালারী
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default ResourcesPage;
