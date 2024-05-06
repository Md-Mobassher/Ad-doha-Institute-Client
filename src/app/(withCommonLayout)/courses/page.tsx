import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { coursesData } from "@/data/courses";

const CoursesPage = () => {
  return (
    <div className="lg:-mt-12 -mt-5 mb-20">
      <Container>
        <Title title="Our Courses" />

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {coursesData.map((course) => (
            <Card
              key={course.id}
              {...course}
              navigate="courses"
              btnTitle="Details"
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CoursesPage;
