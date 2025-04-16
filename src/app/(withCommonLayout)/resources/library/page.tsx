import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Box } from "@mui/material";
import LibraryComponent from "./LibraryComponent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = messages?.BookPage?.metaTitle;
  const description = messages?.BookPage?.metaDescription;

  return {
    title,
    description,
  };
}

const BooksPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <LibraryComponent />
    </Box>
  );
};

export default BooksPage;
