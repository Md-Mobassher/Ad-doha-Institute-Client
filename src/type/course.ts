export interface TCourse {
  _id: string;
  courseImage: any;
  courseName: string;
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

export const defaultCourseData: TCourse = {
  _id: "",
  courseName: "",
  courseImage: null,
  medium: "",
  totalClasses: "",
  courseDuration: "",
  schedule: "",
  classDuration: "",
  fee: {
    total: "",
    admission: "",
    monthly: "",
  },
  contact: "",
  courseDescription: "",
};
