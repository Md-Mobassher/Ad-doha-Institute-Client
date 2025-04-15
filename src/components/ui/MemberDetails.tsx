import Image from "next/image";
import { TOpinion, TTeacher } from "@/type";
import { Box, Stack } from "@mui/material";
import CardTitle from "./CardTitle";
import CardSubTitle from "./CardSubTitle";
import Details from "./Details";

interface MemberDetailsProps {
  member: TTeacher | TOpinion | null;
}

const MemberDetails = ({ member }: MemberDetailsProps) => {
  if (!member) return null;

  const { image, name, designation, opinion } = member;

  return (
    <Stack
      direction={{ lg: "column", md: "column" }}
      sx={{
        gap: 2,
        padding: "10px",
      }}
      alignItems="center"
      justifyContent="center"
    >
      {image && (
        <Image
          src={image}
          alt={name}
          className="rounded-t-lg"
          width={300}
          height={300}
        />
      )}

      <Box p={1}>
        <CardTitle title={name} />
        <CardSubTitle title={designation} />
        {opinion && <Details details={opinion} />}
      </Box>
    </Stack>
  );
};

export default MemberDetails;
