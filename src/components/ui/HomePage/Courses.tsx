import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import Container from "../Container";
import { coursesData } from "@/data/courses";

const Courses = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="Our Courses" />
        <Button title="View All" navigate="courses" />
      </div>

      <div>
        <Slider
          items={coursesData}
          slidesPerView={4}
          btnTitle="Course Details"
          navigate="courses"
        />
      </div>
    </Container>
  );
};

export default Courses;
