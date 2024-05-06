import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { servicesData } from "@/data/services";

const ServicesPage = () => {
  return (
    <div className="lg:-mt-12 -mt-5 mb-20">
      <Container>
        <Title title="Our Services" />

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
  );
};

export default ServicesPage;
