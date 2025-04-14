import { TAuthor } from "./author";

export type TBook = {
  _id: string;
  title: string;
  category: string;
  authors?: TAuthor;
  image: string;
  url: string;
  publishedDate?: string;
  publisher?: string;
  description?: string;
  price: number;
  stock?: number;
  language?: string;
  rating?: number;
  reviews?: { userId: string; comment: string; rating: number }[];
  pageCount: number;
  format: "Paperback" | "Hardcover" | "Ebook";
};
