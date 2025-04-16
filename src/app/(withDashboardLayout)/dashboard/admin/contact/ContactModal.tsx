import CourseTitle2 from "@/app/(withCommonLayout)/courses/components/CourseTitle2";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { Box } from "@mui/material";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactModal = ({ open, setOpen, data }: TProps) => {
  return (
    <DohaModal
      open={open}
      setOpen={setOpen}
      title={`${data ? `${data.subject}` : "Contact"}`}
    >
      <Box className="flex flex-col gap-2 p-2 md:p-3">
        <CourseTitle2 title={`Name:`} details2={data?.name} />
        <CourseTitle2 title="Email:" details2={data?.email} />
        <CourseTitle2 title="Phone Number:" details2={data?.phone} />
        <CourseTitle2 title="Subject:" details2={data?.subject} />
        <CourseTitle2 title={`Message:`} />
        <CourseTitle2 details={data?.message} />
      </Box>
    </DohaModal>
  );
};

export default ContactModal;
