import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import Container from "../Container";
import { coursesData } from "@/data/courses";
import Card from "../Card";

const Courses = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="Our Courses" />
        <Button title="View All" navigate="courses" />
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-5 mt-8">
        {coursesData.map((course) => (
          <Card key={course.id} {...course} />
        ))}
      </div>
    </Container>
  );
};

export default Courses;
