export interface TCourse {
  _id: string;
  courseImage: any;
  courseName: string;
  medium: string;
  totalClasses: number;
  duration: string;
  schedule: string[];
  classDuration: string;
  fee: {
    total: number;
    admission?: number;
    monthly?: number;
  };
  contact: string;
  description: string;
  objectives?: string[]; // Optional if some courses might not have objectives
  outcomes?: string[]; // Optional if some courses might not have outcomes
  topics?: string[]; // Optional if some courses include a list of topics
  targetAudience?: string[]; // Optional if some courses have a defined target audience
  modules?: string[]; // Optional if some courses include a list of modules
}
