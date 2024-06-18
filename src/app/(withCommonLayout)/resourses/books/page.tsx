import DohaBook from "@/components/ui/DohaBook";
import PageTitle from "@/components/ui/PageTitle";
import { booksData } from "@/data/books";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const BooksPage = () => {
  return (
    <>
      <PageTitle title="বই সমূহ" />

      <Container>
        <Box className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-7 md:gap-6 gap-5 py-10">
          {booksData.map((book) => (
            // <div key={book.id}>
            //   <Link href={book.url} target="_blank">
            //     <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-2xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
            //       <div>
            //         <Image
            //           src={book.image}
            //           alt={book.title}
            //           className="mx-auto pb-2"
            //         />
            //       </div>
            //       <div>
            //         <hr />
            //         <p className="text-center my-2 text-primary font-bold">
            //           {book.title}
            //         </p>
            //       </div>
            //     </div>
            //   </Link>
            // </div>
            <DohaBook key={book.id} {...book} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default BooksPage;
