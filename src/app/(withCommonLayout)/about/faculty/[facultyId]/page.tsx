import DohaContainer from "@/components/ui/DohaContainer";
import MemberDetails from "@/components/ui/MemberDetails";
import { TTeacher } from "@/type";
import { use } from "react";

type TParams = {
  params: Promise<{
    facultyId: string;
  }>;
};

const FacultyDetailsPage = async ({ params }: TParams) => {
  const unwrappedParams = use(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teachers/${unwrappedParams?.facultyId}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  // console.log(data);
  const facultyInfo = (data as TTeacher) || {};
  // console.log(facultyInfo);

  return (
    <DohaContainer>
      <MemberDetails {...facultyInfo} />
    </DohaContainer>
  );
};

export default FacultyDetailsPage;
