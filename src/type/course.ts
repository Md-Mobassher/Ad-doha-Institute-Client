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
  feePaymentMethod: string;
  contact: string;
  courseDescription: string;
  createdAt?: string;
  upddatedAt?: string;
  __v?: number;
}

export interface IOfferedCourse {
  _id?: string;
  course: TCourse;
  orientation: string;
  admissionDeadline: string;
  startDate: string;
  endDate: string;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
