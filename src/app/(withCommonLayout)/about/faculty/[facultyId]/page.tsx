import MemberDetails from "@/components/ui/MemberDetails";
import { facultyData } from "@/data/faculties";
import { TMember } from "@/type";

type TParams = {
  params: {
    facultyId: string;
  };
};

const FacultyDetailsPage = ({ params }: TParams) => {
  const facultyInfo = facultyData.find(
    (faculty) => faculty.id === params.facultyId
  );

  return (
    <div className="lg:p-5 p-2">
      <MemberDetails {...(facultyInfo as TMember)} />
    </div>
  );
};

export default FacultyDetailsPage;
