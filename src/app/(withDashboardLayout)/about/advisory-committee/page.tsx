import Member from "@/components/ui/Member";
import { advisoryCommitteData } from "@/data/advisoryCommittee";

const AdvisoryCommitteePage = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
      {advisoryCommitteData &&
        advisoryCommitteData.map((committee) => (
          <Member
            key={committee.id}
            {...committee}
            navigate={`/about/advisory-committee/${committee.id}`}
          />
        ))}
    </div>
  );
};

export default AdvisoryCommitteePage;
