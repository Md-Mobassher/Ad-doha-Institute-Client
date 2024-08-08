import DohaCard from "@/components/ui/DohaCard";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { servicesData } from "@/data/services";

const ServicesPage = () => {
  return (
    <>
      <PageTitle title="আমাদের সেবাসমূহ" />

      <DohaContainer>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5">
          {servicesData.map((service) => (
            <>
              <DohaCard
                key={service.id}
                {...service}
                navigate="services"
                btnTitle="বিস্তারিত"
                btnTitle2="সেবা নিন"
                link={service.link}
              />
            </>
          ))}
        </div>
      </DohaContainer>
    </>
  );
};

export default ServicesPage;
