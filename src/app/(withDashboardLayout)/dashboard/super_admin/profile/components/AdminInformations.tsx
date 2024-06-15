import { Box, Stack, styled, Typography } from "@mui/material";
import { dateFormatter } from "../../../../../../utils/dateFormatter";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7f7",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const AdminInformation = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.fullName}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            ID
          </Typography>
          <Typography>{data?.id}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Designation
          </Typography>
          <Typography>{data?.designation}</Typography>
        </StyledInformationBox>
      </Stack>

      <Typography variant="h5" my={2} color={"primary.main"}>
        Others Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} flexWrap={"wrap"} gap={2}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Gender
          </Typography>
          <Typography>{data?.gender}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Date of Birth
          </Typography>
          <Typography>{dateFormatter(data?.dateOfBirth)}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Blood Group
          </Typography>
          <Typography>{data?.bloodGroup}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Contact Number
          </Typography>
          <Typography>{data?.contactNo}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Emergency Contact Number
          </Typography>
          <Typography>{data?.emergencyContactNo}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Present Address
          </Typography>
          <Typography>{data?.presentAddress}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Permanent Address
          </Typography>
          <Typography>{data?.permanentAddress}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default AdminInformation;
