import DohaContainer from "@/components/ui/DohaContainer";
import MemberDetails from "@/components/ui/MemberDetails";
import { advisoryCommitteData } from "@/data/advisoryCommittee";
import { TMember } from "@/type";
import { Box } from "@mui/material";

type TParams = {
  params: {
    committeeId: string;
  };
};

const AdvisoryCommitteeDetailsPage = ({ params }: TParams) => {
  const committeeData = advisoryCommitteData.find(
    (committee) => committee.id === params.committeeId
  );

  return (
    <DohaContainer>
      <Box p={2}>
        <MemberDetails {...(committeeData as TMember)} />
      </Box>
    </DohaContainer>
  );
};

export default AdvisoryCommitteeDetailsPage;
