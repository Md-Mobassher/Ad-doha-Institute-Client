import FuturePlan from "@/components/ui/AboutPage/FuturePlan";
import { objectivesData } from "@/data/aimsObjectives";

const FuturePlanPage = () => {
  return (
    <>
      <div className="text-center mt-5">
        <h1 className="text-2xl font-bold text-primary">
          {objectivesData.pageTitle.title}
        </h1>
        <h3 className="text-xl font-bold mt-1">
          {objectivesData.pageTitle.details}
        </h3>
      </div>
      <div className=" p-4">
        <FuturePlan {...objectivesData.futurePlan} />
      </div>
    </>
  );
};

export default FuturePlanPage;
