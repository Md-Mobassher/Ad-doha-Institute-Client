import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Navbar/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad-doha Institute",
  description:
    "Ad-doha Institute; An educational, research, dawah and service institution.",
};
const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header header={1} menu={1} top={1} />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayoutPage;
