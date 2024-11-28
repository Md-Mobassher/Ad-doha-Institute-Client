export interface TCourse {
  _id: string;
  courseImage: any;
  courseName: string;
  slug: string;
  medium: string;
  totalClasses: string;
  courseDuration: string;
  schedule: string;
  classDuration: string;
  fee: {
    total: string;
    admission?: string;
    monthly?: string;
  };
  contact: string;
  courseDescription: string;
  createdAt?: string;
  upddatedAt?: string;
  __v?: number;
}
