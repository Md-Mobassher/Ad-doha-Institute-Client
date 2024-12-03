import { TCardProps } from "@/type";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import CardTitle from "./CardTitle";
import Details from "./Details";
import DohaButton from "./DohaButton";
import Link from "next/link";

const DohaCard = ({
  image,
  title,
  details,
  btnTitle,
  btnTitle2,
  navigation,
  link,
  navigate,
}: TCardProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      sx={{
        borderRadius: "8px",
        border: "1px solid lightgray",
        width: "100%",
        height: "100%",
        backgroundColor: "secondary.main",
        ":hover": {
          border: "1px solid #22C55E",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            width: "100%",
            height: 250,
            "& img": {
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "cover",
              borderBottom: "1px solid lightgray",
              borderTopRadius: "50px",
            },
          }}
        >
          <Image
            src={image}
            alt={title || "card image"}
            width={300}
            height={250}
            className="bg-white rounded-t-lg"
          />
        </Box>
        <Box px="20px" pt="20px">
          {title && <CardTitle title={title} />}
          {details && <Details details={`${details.slice(0, 145)}...`} />}
        </Box>
      </Box>

      <Box>
        {btnTitle && (
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            pt="10px"
            px="20px"
            pb="20px"
          >
            {btnTitle && (
              <DohaButton
                btnTitle={btnTitle || "বিস্তারিত"}
                id={navigation}
                navigate={navigate}
                title={title}
              />
            )}

            {btnTitle2 && link && (
              <Link href={link as string}>
                <DohaButton btnTitle={btnTitle2 || "বিস্তারিত"} />
              </Link>
            )}
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default DohaCard;
