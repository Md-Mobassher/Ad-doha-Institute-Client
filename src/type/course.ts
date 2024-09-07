export interface TCourse {
  _id: string;
  navigation: string;
  courseImage: any;
  courseName: string;
  medium?: string;
  totalClasses: string;
  duration: string;
  schedule: string[];
  classDuration: string;
  fee: {
    total: string;
    admission?: string;
    monthly?: string;
  };
  contact: string;
  description: string;
  objectives?: string[];
  outcomes?: string[];
  topics?: string[];
  targetAudience?: string[];
  modules?: string[];
  link?: string;
}

export const defaultCourseData: TCourse = {
  _id: "",
  navigation: "",
  courseName: "",
  courseImage: null,
  medium: "",
  totalClasses: "",
  duration: "",
  schedule: [],
  classDuration: "",
  fee: {
    total: "",
    admission: "",
    monthly: "",
  },
  contact: "",
  description: "",
};
