import Container from "./DohaContainer";
import Image from "next/image";
import DetailsItem from "./DetailsItem";
import { TCardDetails } from "@/type";
import DohaButton from "./DohaButton";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import Title from "@/components/ui/Title";
import PageTitle from "./PageTitle";
import SubTitle from "./SubTitle";

const CardDetails = ({
  image,
  description,
  details,
  title,
  btnTitle,
  link,
}: TCardDetails) => {
  return (
    <>
      <PageTitle title={title} />
      <Box className="">
        <Container>
          {details && (
            <Box className="max-w-3xl mx-auto lg:-mt-10 md:-mt-7 -mt-5 lg:mb-5 mb-8">
              <SubTitle title={details} />
            </Box>
          )}

          <Box className="md:flex flex-wrap justify-between items-start rounded-lg min-h-80 lg:p-8">
            <Box className="lg:w-[45%] md:w-[45%] w-full rounded-lg border border-gray-300">
              <Image src={image} alt={title} className="mx-auto rounded-lg" />
            </Box>

            <Box className="lg:w-[45%] md:w-[45%] w-full lg:mt-0 mt-8">
              {description?.map((item, index) => (
                <DetailsItem key={index} item={item} />
              ))}

              <Box>
                {btnTitle && link && (
                  <Link href={link as string}>
                    <DohaButton btnTitle={btnTitle || "Details"} />
                  </Link>
                )}
                {link && (
                  <Link href={link as string}>
                    <Stack
                      direction="row"
                      gap="30px"
                      justifyContent="start"
                      alignItems="center"
                      mt={3}
                    >
                      <Typography
                        component="h3"
                        variant="h3"
                        fontSize={{
                          lg: "22px",
                          md: "21px",
                          sm: "20px",
                          xs: "18px",
                        }}
                        color="primary.main"
                        textAlign="center"
                      >
                        {title}
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h3"
                        sx={{
                          fontSize: {
                            lg: "16px",
                            md: "16px",
                            sm: "15px",
                            xs: "14px",
                          },
                          color: "warning.main",
                        }}
                      >
                        - সেবাটি পেতে এখানে{" "}
                      </Typography>
                      <DohaButton btnTitle={btnTitle || "ক্লিক করুন"} />
                    </Stack>
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CardDetails;
