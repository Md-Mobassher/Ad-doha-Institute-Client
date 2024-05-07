import CardDetails from "@/components/ui/CardDetails";
import { servicesData } from "../../../../data/services/index";

type TParamsProps = {
  params: {
    serviceId: string;
  };
};

const ServiceDetailsPage = ({ params }: TParamsProps) => {
  const serviceData = servicesData.find(
    (service) => service.id === params.serviceId
  );

  return (
    <div className="">
      {serviceData ? (
        <>
          <CardDetails {...serviceData} />
        </>
      ) : (
        <p>No Service Found</p>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
