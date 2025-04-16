import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ContactForm from "./ContactForm";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("ContactPage");
  const contactData = t.raw("contactData") as any[];
  return (
    <Box>
      <PageTitle title={t("pageTitle")} />

      <DohaContainer>
        <Box className="flex flex-col gap-10 justify-center items-center">
          <Box className=" border border-gray-300 hover:border-primary rounded-lg shadow-md lg:p-8 md:p-6 p-5  md:max-w-3xl w-full">
            <ContactForm />
          </Box>
          <Box className="flex lg:flex-row md:flex-row flex-col max-w-6xl  gap-5">
            {contactData?.map((data) => (
              <Box
                key={data.id}
                className="flex flex-1 gap-5 justify-start items-center mb-5 border border-gray-300 hover:border-primary rounded-lg shadow-md p-5"
              >
                <Box className="w-[60px]">
                  <Image
                    src={data.image}
                    alt={data.title}
                    width={80}
                    height={80}
                  />
                </Box>
                <Box>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{
                      fontSize: {
                        xl: "20px",
                        lg: "20px",
                        md: "18px",
                        sm: "17px",
                        xs: "16px",
                      },

                      pb: "8px",
                      fontWeight: "600",
                      color: "primary.main",
                    }}
                  >
                    {data.title}
                  </Typography>

                  <Typography
                    component="h6"
                    variant="h6"
                    sx={{
                      fontSize: {
                        xl: "16px",
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "15px",
                      },
                      fontWeight: "500",
                      color: "warning.main",
                    }}
                  >
                    {data.details}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default ContactPage;
