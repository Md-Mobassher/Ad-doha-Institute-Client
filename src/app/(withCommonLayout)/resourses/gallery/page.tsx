import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";

const GalleryPage = () => {
  return (
    <>
      <PageTitle title="Gallery" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-5 mt-8"></div>
        </Container>
      </div>
    </>
  );
};

export default GalleryPage;
