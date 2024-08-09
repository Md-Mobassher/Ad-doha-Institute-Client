import { coursesData } from "@/data/courses";

type TParamsProps = {
  params: {
    courseId: string;
  };
};

const courseDetailsPage = ({ params }: TParamsProps) => {
  const courseData = coursesData?.find(
    (course) => course?.navigation === params?.courseId
  );

  return <div>courseDetailsPage</div>;
};

export default courseDetailsPage;
