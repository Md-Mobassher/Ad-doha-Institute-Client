import DohaCard from "@/components/ui/DohaCard";
import Container from "@/components/ui/DohaContainer";
import PageTitle from "@/components/ui/PageTitle";
import { coursesData } from "@/data/courses";

const CoursesPage = () => {
  return (
    <>
      <PageTitle title="Our Courses" />
      <div className="lg:-mt-8 -mt-3 mb-14">
        <Container>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
            {coursesData.map((course) => (
              <DohaCard
                key={course.id}
                {...course}
                navigate="courses"
                // btnTitle="Details"
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CoursesPage;
