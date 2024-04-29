type ITitle = {
  title: string;
};

const Title = ({ title }: ITitle) => {
  return (
    <div className=" lg:text-start md:text-start text-center lg:mt-20 md:mt-16 mt-10 mb-5">
      <h2 className="lg:text-3xl md:text-2xl text-2xl font-bold uppercase text-green-400 text-center">
        {title}
      </h2>
    </div>
  );
};

export default Title;
