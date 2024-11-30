import DohaContainer from "@/components/ui/DohaContainer";
import MemberDetails from "@/components/ui/MemberDetails";
import { TTeacher } from "@/type";
import { Box } from "@mui/material";
import { use } from "react";

type TParams = {
  params: Promise<{
    committeeId: string;
  }>;
};

const AdvisoryCommitteeDetailsPage = async ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/advisory-comittees/${unwrappedParams.committeeId}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  // console.log(data);
  const committeeData = (data as TTeacher) || {};
  // console.log(committeeData);
  return (
    <DohaContainer>
      <Box p={2}>
        <MemberDetails {...committeeData} />
      </Box>
    </DohaContainer>
  );
};

export default AdvisoryCommitteeDetailsPage;
