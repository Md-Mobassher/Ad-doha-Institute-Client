type ITitle = {
  title: string;
};

const PageTitle = ({ title }: ITitle) => {
  return (
    <h1 className="lg:text-3xl md:text-2xl text-2xl font-bold uppercase text-white text-center bg-primary py-5">
      {title}
    </h1>
  );
};

export default PageTitle;
