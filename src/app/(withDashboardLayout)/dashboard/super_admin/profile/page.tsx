"use client";

import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/features/myProfile";
import AutoFileUploader from "@/components/form/AutoFileUploader";
import AdminInformation from "./components/AdminInformations";
import LoadingPage from "@/app/loading";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { toast } from "sonner";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();
  // console.log(data);

  const handleUpdateImage = async (file: File) => {
    // console.log(file);
    const imageUrl = await uploadImageToCloudinary(file);
    if (!imageUrl) {
      return;
    }
    const data = {
      profileImg: imageUrl,
    };

    try {
      const res = await updateMYProfile(data).unwrap();
      // console.log(res);
      if (res?._id) {
        toast.success("Profile photo updated successfully!!!");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (isLoading) {
    <LoadingPage />;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?._id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 320,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
                border: "1px solid green",
              }}
            >
              {data?.profileImg ? (
                <Image
                  height={450}
                  width={400}
                  src={data?.profileImg}
                  alt={data?.fullName || "User Photo"}
                />
              ) : (
                <PersonIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "gray",
                    color: "white",
                  }}
                />
              )}
            </Box>
            <Button
              sx={{
                my: 3,
                width: "100%",
              }}
            >
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={(file) => handleUpdateImage(file)}
                  variant="text"
                />
              )}
            </Button>

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <AdminInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
