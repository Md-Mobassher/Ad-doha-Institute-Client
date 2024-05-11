import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { servicesData } from "@/data/services";

const ServicesSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="আমাদের সেবাসমূহ" />
        <Button btnTitle="সকল " navigate="services" />
      </div>

      <div>
        <Slider
          items={servicesData}
          slidesPerView={3}
          btnTitle="বিস্তারিত"
          btnTitle2="সেবা নিন"
          navigate="services"
        />
      </div>
    </Container>
  );
};

export default ServicesSection;
