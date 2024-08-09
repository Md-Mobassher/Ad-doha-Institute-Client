import Container from "./DohaContainer";
import Image from "next/image";
import DetailsItem from "./DetailsItem";
import { TCardDetails } from "@/type";
import PageTitle from "./PageTitle";
import DohaButton from "./DohaButton";
import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import CardTitle from "./CardTitle";

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
      <PageTitle title={`${title}`} />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="md:flex flex-wrap justify-between items-center mt-8 rounded-lg min-h-80 lg:p-8 p-5">
            <div className="lg:w-[45%] md:w-[45%] w-full">
              <Image src={image} alt={title} className="mx-auto" />
            </div>

            <div className="lg:w-[45%] md:w-[45%] w-full lg:mt-0 mt-5">
              {description?.map((item, index) => (
                <DetailsItem key={index} item={item} index={index} />
              ))}
              {details && <Typography>{details}</Typography>}
              <div>
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
                      <CardTitle title={title} />
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
                        {" "}
                        - সেবাটি পেতে এখানে{" "}
                      </Typography>
                      <DohaButton btnTitle={btnTitle || "ক্লিক করুন"} />
                    </Stack>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CardDetails;
