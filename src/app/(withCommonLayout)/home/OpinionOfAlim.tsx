import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import Opinions from "./Opinions";
import { Box } from "@mui/material";
import { TOpinion } from "@/type";
import { getTranslations } from "next-intl/server";

const OpinionOfAlim = async () => {
  const t = await getTranslations("HomePage");
  let opinions: TOpinion[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/opinions`,
      {
        next: {
          revalidate: 30,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Fetch failed:", res.status, text);
      throw new Error("Failed to fetch opinions");
    }

    const json = await res.json();
    opinions = json?.data || [];
  } catch (error) {
    console.error("Error loading opinions:", error);
  }

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
