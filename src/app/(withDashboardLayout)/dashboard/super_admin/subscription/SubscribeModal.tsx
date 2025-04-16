import CourseTitle2 from "@/app/(withCommonLayout)/courses/components/CourseTitle2";
import DohaModal from "@/components/shared/DohaModal/DohaModal";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box } from "@mui/material";

type TProps = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubscribeModal = ({ open, setOpen, data }: TProps) => {
  return (
    <DohaModal open={open} setOpen={setOpen} title={"Subscription"}>
      <Box className="flex flex-col gap-3 p-2 md:p-3">
        <CourseTitle2 title="Email:" details2={data?.email} />
        <CourseTitle2
          title="Subscribed At:"
          details2={dateFormatter(data?.createdAt)}
        />
      </Box>
    </DohaModal>
  );
};

export default SubscribeModal;
