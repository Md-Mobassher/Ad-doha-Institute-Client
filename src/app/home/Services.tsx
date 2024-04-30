import Title from "@/components/ui/Title";
import Slider from "@/components/ui/Slider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const services = [
  {
    id: "1",
    title: "Assistance in housing construction",
    image: "https://i.ibb.co/VwkQfC4/home.jpg",
    details:
      "Ad-Doha Institute provides conditional housing assistance to non-Muslims, helpless, destitute and poor Muslims.",
  },
  {
    id: "2",
    title: "Employment",
    image: "https://i.ibb.co/JkQPgYj/employment.jpg",
    details:
      "Ad-Doha Institute provides employment for non-Muslims according to their merit and makes them self-reliant by providing rickshaws/vans subject to conditions.",
  },
  {
    id: "3",
    title: "Medical care",
    image: "https://i.ibb.co/nbz28VY/treatment.jpg",
    details:
      "Ad-Doha Institute provides conditional treatment for non-Muslims and poor Muslims who are unable to afford medical expenses.",
  },
  {
    id: "4",
    title: "Educational assistance",
    image: "https://i.ibb.co/8g2fhSm/education-help.jpg",
    details:
      "Ad-Doha Institute provides educational support to non-Muslim and poor students at various levels.",
  },
  {
    id: "5",
    title: "Korze Hasanah",
    image: "https://i.ibb.co/SfjfYNf/korje-hasanah.jpg",
    details:
      "Ad-Doha Institute provides Korze Hasanah subject to conditions to help non-Muslims, destitute, poor and needy Muslims and make them self-reliant.",
  },
  {
    id: "6",
    title: "Legal aid",
    image: "https://i.ibb.co/zsTRrTm/low.jpg",
    details:
      "Ad-Doha Institute provides all types of legal assistance to non-Muslims. Especially making affidavit, help in correction of ID card, case etc.",
  },
  {
    id: "7",
    title: "Marriage",
    image: "https://i.ibb.co/2nYbyT4/marriage.jpg",
    details:
      "Under the initiative of Ad-Doha Institute, non-Muslim marriages are arranged.",
  },
  {
    id: "8",
    title: "Sunnah circumcision",
    image: "https://i.ibb.co/LkwvdDV/sunnate-khatna.jpg",
    details:
      "Ad-Doha Institute assists neo-Muslims in undergoing Sunnah circumcision.",
  },
];

const Services = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7 ">
        <Title title="Our Services" />
        <Button title="View All " />
      </div>

      <div>
        <Slider items={services} slidesPerView={4} />
      </div>
    </Container>
  );
};

export default Services;
