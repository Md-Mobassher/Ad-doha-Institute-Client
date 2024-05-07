import DetailsItem from "@/components/ui/DetailsItem";
import { objectivesData } from "@/data/aimsObjectives";

const AimsObjectivesPage = () => {
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
        {/* aim */}
        <div className="mt-8">
          <div className="divider divider-start divider-primary h-1 mb-5">
            <h3 className="text-xl font-bold text-primary">
              {objectivesData.aim.title}
            </h3>
          </div>
          <div className="mt-8">
            <p>{objectivesData.aim.details}</p>
          </div>
        </div>

        {/* objectives */}
        <div className="mt-10">
          <div className="divider divider-start divider-primary h-1">
            <h3 className="text-xl font-bold text-primary">
              {objectivesData.objectives.title}
            </h3>
          </div>
          <div className="mt-8">
            {objectivesData.objectives.details.map((item, index) => (
              <DetailsItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AimsObjectivesPage;
