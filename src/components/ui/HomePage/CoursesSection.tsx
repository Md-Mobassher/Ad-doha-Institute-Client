import Title from "@/components/ui/Title";
import Container from "../Container";
import { coursesData } from "@/data/courses";
import DohaCard from "../DohaCard";
import DohaButton from "../DohaButton";

const CoursesSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="আমাদের কোর্সসমূহ" />
        <DohaButton btnTitle="সকল" navigate="courses" />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 gap-5 mt-8">
        {coursesData.map((course) => (
          <DohaCard key={course.id} {...course} />
        ))}
      </div>
    </Container>
  );
};

export default CoursesSection;
