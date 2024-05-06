import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { servicesData } from "@/data/services";

const Services = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="Our Services" />
        <Button btnTitle="View All " navigate="services" />
      </div>

      <div>
        <Slider
          items={servicesData}
          slidesPerView={3}
          btnTitle="Details"
          navigate="services"
        />
      </div>
    </Container>
  );
};

export default Services;
