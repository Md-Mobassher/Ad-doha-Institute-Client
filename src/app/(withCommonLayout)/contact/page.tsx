import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { contactData } from "@/data/contact";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const ContactPage = () => {
  return (
    <Box>
      <PageTitle title="যোগাযোগ" />

      <DohaContainer>
        <Box className="lg:flex md:flex justify-between lg:gap-10 gap-5">
          <Box className=" border border-gray-300 hover:border-primary rounded-lg shadow-md lg:p-5 px-2 py-5 lg:w-[50%] md:w-[50%] w-full h-[405px]">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSd4tswcZxcjBGtyiCwfpBQz0PmKX72rL9z82TGW-yjmiivqaw/viewform?embedded=true"
              className="w-full h-full"
            >
              Loading…
            </iframe>
          </Box>
          <Box className=" lg:w-[50%] md:w-[50%] w-full lg:mt-0 mt-5">
            {contactData?.map((data) => (
              <Box
                key={data.id}
                className="flex justify-start items-center gap-5 mb-5 border border-gray-300 hover:border-primary rounded-lg shadow-md p-5"
              >
                <Box className="w-[15%]">
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
