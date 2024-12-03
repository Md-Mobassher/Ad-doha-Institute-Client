"use client";

import { TTeacher } from "@/type";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import CardTitle from "./CardTitle";
import CardSubTitle from "./CardSubTitle";
import { useState } from "react";
import Details from "./Details";
import DohaModal from "../shared/DohaModal/DohaModal";
import MemberDetails from "./MemberDetails";

interface MemberCardProps {
  member: TTeacher;
}

const CommitteeMemeberCard = ({ member }: MemberCardProps) => {
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
            md: "400px",
            sm: "400",
            xs: "100%",
          },
          overflow: "auto",
          backgroundColor: "secondary.main",
          boxShadow: "5 2 1",
          ":hover": { border: "1px solid #22C55E" },
          cursor: "pointer",
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Image
            src={member.image}
            alt={member.name}
            width={500}
            height={500}
            style={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              objectFit: "contain",
            }}
          />
        </Stack>
        <Box sx={{ overflow: "hidden", mt: 2, p: 1 }}>
          {member?.name && <CardTitle title={member.name} />}
          {member?.designation && (
            <CardSubTitle title={`${member.designation.slice(0, 70)}...`} />
          )}
          {member?.opinion && (
            <Details details={`${member.opinion.slice(0, 200)}...`} />
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

export default CommitteeMemeberCard;
