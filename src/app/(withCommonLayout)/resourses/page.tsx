import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

const ResourcesPage = () => {
  return (
    <>
      <PageTitle title="Resourses" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
            <Link href="/resourses/books">
              <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
                <div className="flex justify-center items-center p-3">
                  <IoBookSharp size={250} className="text-primary" />
                </div>
                <div>
                  <hr />
                  <p className="text-center my-3 text-primary text-2xl font-bold">
                    Books
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
                    Videos
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
                    Gallery
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ResourcesPage;
