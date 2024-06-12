import DohaFileUploader from "@/components/form/DohaFileUploader";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    // const data = modifyPayload(values);
    // try {
    //   const res = await createSpecialty(data).unwrap();
    //   console.log(res);
    //   if (res?.id) {
    //     toast.success("Specialty created successfully!!");
    //     setOpen(false);
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    // }
  };

  return (
    <DohaModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <DohaForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <DohaInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <DohaFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </DohaForm>
    </DohaModal>
  );
};

export default SpecialtyModal;
