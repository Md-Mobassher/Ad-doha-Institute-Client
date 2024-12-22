import { TTeacher } from "./common";
import { IDepartment } from "./department";

export interface TCourse {
  _id: string;
  academicDepartment: string;
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
  academicDepartment: IDepartment;
  course: TCourse;
  batch: string;
  faculty: TTeacher;
  orientation: string;
  admissionDeadline: string;
  startDate: string;
  endDate: string;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type IEnrolledCourse = {
  _id?: string;
  academicDepartment: string;
  offeredCourse: string;
  course: string;
  student: string;
  faculty: string;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};

export type TGrade = "A" | "B" | "C" | "D" | "F" | "NA";

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};
