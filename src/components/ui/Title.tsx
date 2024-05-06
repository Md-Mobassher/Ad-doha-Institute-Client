type ITitle = {
  title: string;
};

const Title = ({ title }: ITitle) => {
  return (
    <h1 className="lg:text-3xl md:text-2xl text-2xl font-bold uppercase text-primary text-center">
      {title}
    </h1>
  );
};

export default Title;
