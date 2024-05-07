import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { servicesData } from "@/data/services";

const ServicesPage = () => {
  return (
    <>
      <PageTitle title="Our Services" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
            {servicesData.map((service) => (
              <Card
                key={service.id}
                {...service}
                navigate="services"
                btnTitle="Details"
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ServicesPage;
