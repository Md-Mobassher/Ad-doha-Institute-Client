import Card from "@/components/ui/Card";

import PageTitle from "@/components/ui/PageTitle";
import { servicesData } from "@/data/services";
import { Container } from "@mui/material";

const ServicesPage = () => {
  return (
    <>
      <PageTitle title="আমাদের সেবাসমূহ" />

      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          {servicesData.map((service) => (
            <>
              <Card
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
      </Container>
    </>
  );
};

export default ServicesPage;
