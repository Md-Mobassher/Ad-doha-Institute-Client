import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Container from "@/components/ui/DohaContainer";
import { servicesData } from "@/data/services";
import { Box, Stack } from "@mui/material";
import DohaButton from "@/components/ui/DohaButton";

const ServicesSection = () => {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="আমাদের সেবাসমূহ" />
        <DohaButton btnTitle="সকল " navigate="services" />
      </Stack>

      <Box>
        <Slider
          items={servicesData}
          slidesPerView={3}
          btnTitle="বিস্তারিত"
          btnTitle2="সেবা নিন"
          navigate="services"
        />
      </Box>
    </Container>
  );
};

export default ServicesSection;
