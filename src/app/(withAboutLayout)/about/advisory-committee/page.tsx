import Member from "@/components/ui/Member";
import {
  advisoryCommitteData,
  advisoryCommitteePageTitle,
} from "@/data/advisoryCommittee";
import { Box, Divider, Typography } from "@mui/material";

const AdvisoryCommitteePage = () => {
  return (
    <>
      <Box my={2}>
        <Typography
          component="h2"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "primary.main",
            textAlign: "center",
          }}
        >
          {advisoryCommitteePageTitle}
        </Typography>
      </Box>
      <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
        {advisoryCommitteData &&
          advisoryCommitteData.map((committee) => (
            <Member
              key={committee.id}
              {...committee}
              navigate={`/about/advisory-committee/${committee.id}`}
            />
          ))}
      </Box>
    </>
  );
};

export default AdvisoryCommitteePage;
