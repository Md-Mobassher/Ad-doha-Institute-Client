import CardDetails from "@/components/ui/CardDetails";
import { servicesData } from "../../../../data/services/index";
import { Box } from "@mui/material";
import { use } from "react";

type TParamsProps = {
  params: Promise<{
    serviceId: string;
  }>;
};

const ServiceDetailsPage = ({ params }: TParamsProps) => {
  const unwrappedParams = use(params);
  const serviceData = servicesData.find(
    (service) => service?.navigation === unwrappedParams?.serviceId
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
