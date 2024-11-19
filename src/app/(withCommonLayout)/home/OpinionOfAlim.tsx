import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Opinions from "./Opinions";
import { Box } from "@mui/material";
import { IOpinion } from "@/type";

const OpinionOfAlim = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/opinions`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  // console.log(data);
  const opinions = (data as IOpinion[]) || [];
  return (
    <Box>
      <DohaContainer>
        <Title title="আলিমদের মতামত" />

        <Box mt={4}>
          <Opinions opinions={opinions} />
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default OpinionOfAlim;
