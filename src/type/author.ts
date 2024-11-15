export interface IAuthor {
  _id: string;
  name: string;
  image: string;
  biography?: string;
  birthDate?: Date;
  nationality?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  books?: string[];
}
