import { TCardProps } from "@/type";
import Image from "next/image";
import { Box } from "@mui/material";
import CardTitle from "./CardTitle";
import Details from "./Details";

const DohaCard = ({ image, title, details }: TCardProps) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        border: "1px solid lightgray",
        width: "100%",
        height: {
          xl: "400px",
          lg: "410px",
          md: "430px",
          sm: "420px",
          xs: "390px",
        },
        backgroundColor: "secondary.main",
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
        {details && <Details details={details} />}
      </Box>
    </Box>
  );
};

export default DohaCard;
