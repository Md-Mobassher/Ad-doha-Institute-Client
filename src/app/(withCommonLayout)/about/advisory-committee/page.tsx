import { Box } from "@mui/material";
import DohaContainer from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { TTeacher } from "@/type";
import CommitteeMemeberCard from "@/components/ui/CommitteeMemberCard";

const AdvisoryCommitteePage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/advisory-comittees`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  // console.log(data);
  const advisoryCommitteData = (data as TTeacher[]) || [];

  return (
    <Box>
      <PageTitle title={"উপদেষ্টা কমিটি"} />

      <DohaContainer>
        <Box className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7">
          {advisoryCommitteData &&
            advisoryCommitteData.map((committee) => (
              <CommitteeMemeberCard key={committee._id} member={committee} />
            ))}
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default AdvisoryCommitteePage;
