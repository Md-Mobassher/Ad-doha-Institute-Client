import { advisoryCommitteData } from "@/data/advisoryCommittee";
import Image from "next/image";

const AdvisoryCommitteePage = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
      {advisoryCommitteData &&
        advisoryCommitteData.map((committee) => (
          <div key={committee.id} className="border shadow-lg rounded-lg">
            <div>
              <Image
                src={committee.image}
                alt={committee.name}
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{committee.name}</h3>
              <h5>{committee.designation}</h5>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdvisoryCommitteePage;
