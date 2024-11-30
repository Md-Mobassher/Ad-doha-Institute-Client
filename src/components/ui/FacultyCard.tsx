"use client";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CardTitle from "@/components/ui/CardTitle";
import CardSubTitle from "@/components/ui/CardSubTitle";
import Details from "@/components/ui/Details";
import { TTeacher } from "@/type";
import { useState } from "react";
import DohaModal from "../shared/DohaModal/DohaModal";
import MemberDetails from "./MemberDetails";

interface FacultyCardProps {
  member: TTeacher;
}

const FacultyCard = ({ member }: FacultyCardProps) => {
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TTeacher | null>(null);

  const handleCloseModal = () => {
    setSelectedMember(null);
    setViewDetails(false);
  };
  return (
    <>
      <Box
        onClick={() => {
          setViewDetails(true);
          setSelectedMember(member);
        }}
        sx={{
          borderRadius: "8px",
          border: "1px solid lightgray",
          width: "100%",
          height: {
            xl: "400px",
            lg: "400px",
            md: "380px",
            sm: "100%",
            xs: "100%",
          },
          overflow: "auto",
          backgroundColor: "secondary.main",
          boxShadow: "5 2 1",
          ":hover": { border: "1px solid #22C55E" },
          p: "20px",
          cursor: "pointer",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Image
            src={member.image}
            alt={member.name}
            width={200}
            height={200}
            style={{ borderRadius: "8px", objectFit: "contain" }}
          />
        </Stack>
        <Box sx={{ overflow: "hidden", mt: 2 }}>
          {member?.name && <CardTitle title={member.name} />}
          {member?.designation && (
            <CardSubTitle title={`${member.designation.slice(0, 120)}...`} />
          )}
        </Box>
      </Box>

      {selectedMember && (
        <DohaModal
          title="Details"
          open={viewDetails}
          setOpen={handleCloseModal}
        >
          <MemberDetails member={selectedMember} />
        </DohaModal>
      )}
    </>
  );
};

export default FacultyCard;
