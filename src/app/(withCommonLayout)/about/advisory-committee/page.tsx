import Member from "@/components/ui/Member";
import {
  advisoryCommitteData,
  advisoryCommitteePageTitle,
} from "@/data/advisoryCommittee";
import { Box } from "@mui/material";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { TTeacher } from "@/type";

const AdvisoryCommitteePage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/advisory-comittees`
  );
  const { data } = await res.json();
  // console.log(data);
  const advisoryCommitteData = (data as TTeacher[]) || [];

  return (
    <Box>
      <PageTitle title={advisoryCommitteePageTitle} />

      <DohaContainer>
        <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
          {advisoryCommitteData &&
            advisoryCommitteData.map((committee) => (
              <Member
                key={committee._id}
                {...committee}
                navigate={`/about/advisory-committee/${committee._id}`}
              />
            ))}
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default AdvisoryCommitteePage;
