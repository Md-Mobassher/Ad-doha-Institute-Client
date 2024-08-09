import { TCardProps } from "@/type";
import Image from "next/image";
import DohaButton from "./DohaButton";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import CardTitle from "./CardTitle";

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
    <Box
      sx={{
        borderRadius: "8px",
        border: "1px solid lightgray",
        width: "100%",
        height: {
          xl: "450px",
          lg: "480px",
          md: "480px",
          sm: "470px",
          xs: "450px",
        },
        backgroundColor: "#fff",
        boxShadow: "5 2 1",
        ":hover": {
          border: "1px solid #22C55E",
        },
      }}
    >
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
      <Box p="20px">
        {title && <CardTitle title={title} />}
        {details && (
          <Typography
            component="p"
            fontSize={{
              lg: "16px",
              md: "15px",
              sm: "14px",
              xs: "14px",
            }}
            mb="16px"
            textAlign="justify"
          >
            {details}
          </Typography>
        )}

        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          {btnTitle && (
            <DohaButton
              btnTitle={btnTitle || "Details"}
              id={navigation}
              navigate={navigate}
              title={title}
            />
          )}

          {btnTitle2 && link && (
            <Link href={link as string}>
              <DohaButton btnTitle={btnTitle2 || "Details"} />
            </Link>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default DohaCard;
