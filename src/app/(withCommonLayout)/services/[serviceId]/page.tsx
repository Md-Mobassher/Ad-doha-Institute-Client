import CardDetails from "@/components/ui/CardDetails";
import { Box } from "@mui/material";
import { use } from "react";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.ServicesPage?.metaTitle;
  const description = messages?.ServicesPage?.metaDescription;

  return {
    title,
    description,
  };
}

type TParamsProps = {
  params: Promise<{
    serviceId: string;
  }>;
};

const ServiceDetailsPage = ({ params }: TParamsProps) => {
  const unwrappedParams = use(params);
  const t = useTranslations("ServicesPage");
  const servicesData = t.raw("servicesData") as any[];

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
