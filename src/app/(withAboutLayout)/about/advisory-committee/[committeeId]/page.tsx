import MemberDetails from "@/components/ui/MemberDetails";
import { advisoryCommitteData } from "@/data/advisoryCommittee";
import { TMember } from "@/type";

type TParams = {
  params: {
    committeeId: string;
  };
};

const AdvisoryCommitteeDetailsPage = ({ params }: TParams) => {
  const committeeData = advisoryCommitteData.find(
    (committee) => committee.id === params.committeeId
  );
  console.log(committeeData);
  return (
    <div className="p-5">
      <MemberDetails {...(committeeData as TMember)} />
    </div>
  );
};

export default AdvisoryCommitteeDetailsPage;
