import Member from "@/components/ui/Member";
import { facultyData } from "@/data/faculties";

const FacultyPage = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
      {facultyData &&
        facultyData.map((member) => (
          <Member
            key={member.id}
            {...member}
            navigate={`/about/faculty/${member.id}`}
          />
        ))}
    </div>
  );
};

export default FacultyPage;
