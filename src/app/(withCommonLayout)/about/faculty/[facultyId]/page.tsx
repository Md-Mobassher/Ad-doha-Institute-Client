import DohaContainer from "@/components/ui/DohaContainer";
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
    <DohaContainer>
      <MemberDetails {...(facultyInfo as TMember)} />
    </DohaContainer>
  );
};

export default FacultyDetailsPage;
