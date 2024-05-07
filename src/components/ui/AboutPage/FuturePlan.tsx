type TFuturePlanProps = {
  title: string;
  details: string;
  details2: string;
};

const FuturePlan = ({ title, details, details2 }: TFuturePlanProps) => {
  return (
    <div className="mt-8">
      <div className="divider divider-start divider-primary h-1 mb-5">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
      </div>
      <div className="mt-8">
        <p className=" mb-4">{details}</p>
        <p>{details2}</p>
      </div>
    </div>
  );
};

export default FuturePlan;
