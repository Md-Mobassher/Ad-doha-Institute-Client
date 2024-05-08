import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { contactData } from "@/data/contact";
import Image from "next/image";

const ContactPage = () => {
  return (
    <>
      <PageTitle title="যোগাযোগ" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="lg:flex md:flex justify-between lg:gap-10 gap-5 lg:mt-10 mt-8">
            <div className=" border hover:border-primary rounded-lg shadow-md lg:p-5 px-2 py-5 lg:w-[50%] md:w-[50%] w-full h-[405px]">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd4tswcZxcjBGtyiCwfpBQz0PmKX72rL9z82TGW-yjmiivqaw/viewform?embedded=true"
                className="w-full h-full"
              >
                Loading…
              </iframe>
            </div>
            <div className=" lg:w-[50%] md:w-[50%] w-full lg:mt-0 mt-5">
              {contactData.map((data) => (
                <div
                  key={data.id}
                  className="flex justify-start items-center gap-5 mb-5 border hover:border-primary rounded-lg shadow-md p-5"
                >
                  <div className="w-[15%]">
                    <Image
                      src={data.image}
                      alt={data.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-1">
                      {data.title}
                    </h2>
                    <p className="font-semibold">{data.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
