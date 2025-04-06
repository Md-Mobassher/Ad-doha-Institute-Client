import DohaCard from "@/components/ui/DohaCard";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
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

const ServicesPage = () => {
  const t = useTranslations("ServicesPage");
  const servicesData = t.raw("servicesData") as any[];
  return (
    <Box>
      <PageTitle title={t("pageTitle")} />
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
                btnTitle={service.btnTitle}
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
