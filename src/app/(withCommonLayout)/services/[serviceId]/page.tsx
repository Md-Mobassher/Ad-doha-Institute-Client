import CardDetails from "@/components/ui/CardDetails";
import { servicesData } from "../../../../data/services/index";

type TParamsProps = {
  params: {
    serviceId: string;
  };
};

const ServiceDetailsPage = ({ params }: TParamsProps) => {
  console.log(params);
  const serviceData = servicesData.find(
    (service) => service.id === params.serviceId
  );

  return (
    <div className="mt-8">
      {serviceData ? (
        <>
          <CardDetails {...serviceData} />
        </>
      ) : (
        <p>No Project Found</p>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
