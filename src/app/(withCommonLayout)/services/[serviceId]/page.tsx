import CardDetails from "@/components/ui/CardDetails";
import { servicesData } from "../../../../data/services/index";
import { Box } from "@mui/material";

type TParamsProps = {
  params: {
    serviceId: string;
  };
};

const ServiceDetailsPage = ({ params }: TParamsProps) => {
  const serviceData = servicesData.find(
    (service) => service?.navigation === params?.serviceId
  );

  return (
    <Box>
      {serviceData ? (
        <>
          <CardDetails {...serviceData} />
        </>
      ) : (
        <p>No Service Found</p>
      )}
    </Box>
  );
};

export default ServiceDetailsPage;
