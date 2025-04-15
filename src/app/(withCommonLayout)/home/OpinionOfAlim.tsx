import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Opinions from "./Opinions";
import { Box } from "@mui/material";
import { TOpinion } from "@/type";
import { getTranslations } from "next-intl/server";

const OpinionOfAlim = async () => {
  const t = await getTranslations("HomePage");
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
  const opinions = (data as TOpinion[]) || [];
  return (
    <Box>
      <DohaContainer>
        <Title title={t("opinionsSec.title")} />

        <Box mt={4}>
          <Opinions opinions={opinions} />
        </Box>
      </DohaContainer>
    </Box>
  );
};

export default OpinionOfAlim;
