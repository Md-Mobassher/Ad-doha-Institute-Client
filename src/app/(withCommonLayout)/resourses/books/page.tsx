import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { booksData } from "@/data/books";
import Image from "next/image";
import Link from "next/link";

const BooksPage = () => {
  return (
    <div className="lg:-mt-12 -mt-5 mb-20">
      <Container>
        <Title title="Books" />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-5 mt-8">
          {booksData.map((book) => (
            <div key={book.id}>
              <Link href={book.link} target="_blank">
                <div className="border border-primary rounded-lg shadow-lg hover:shadow-primary p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
                  <div>
                    <Image
                      src={book.image}
                      alt={book.title}
                      className="mx-auto pb-2"
                    />
                  </div>
                  <div>
                    <hr />
                    <p className="text-center my-2 text-primary font-bold">
                      {book.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BooksPage;