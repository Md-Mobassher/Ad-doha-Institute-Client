import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Navbar/Header";

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
