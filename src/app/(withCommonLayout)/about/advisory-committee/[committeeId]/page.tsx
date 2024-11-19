import DohaContainer from "@/components/ui/DohaContainer";
import MemberDetails from "@/components/ui/MemberDetails";
import { TTeacher } from "@/type";
import { Box } from "@mui/material";

type TParams = {
  params: {
    committeeId: string;
  };
};

const AdvisoryCommitteeDetailsPage = async ({ params }: TParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/advisory-comittees/${params.committeeId}`,
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
