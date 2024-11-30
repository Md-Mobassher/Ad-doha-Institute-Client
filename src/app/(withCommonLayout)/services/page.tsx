import DohaCard from "@/components/ui/DohaCard";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { servicesData } from "@/data/services";
import { Box } from "@mui/material";

const ServicesPage = () => {
  return (
    <Box>
      <PageTitle title="আমাদের সেবাসমূহ" />
      <Box
        sx={{
          backgroundColor: "info.main",
        }}
      >
        <DohaContainer>
          <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5">
            {servicesData?.map((service) => (
              <DohaCard
                key={service.navigation}
                {...service}
                navigate="services"
                btnTitle="বিস্তারিত"
                link={service.link}
              />
            ))}
          </Box>
        </DohaContainer>
      </Box>
    </Box>
  );
};

export default ServicesPage;
