import { z } from "zod";
import { TBloodGroup, TGender, TUserName } from "./common";

export type TStudent = {
  id: string;
  _id: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
  fullName?: string;
};

export const createUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20),
});

export const createStudentValidationSchema = z.object({
  password: z.string().min(6).max(20).optional(),
  faculty: z.object({
    name: createUserNameValidationSchema,
    designation: z.string().max(30),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    presentAddress: z.string(),
    permanentAddress: z.string(),
  }),
});

export const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateStudentValidationSchema = z.object({
  faculty: z.object({
    name: updateUserNameValidationSchema.optional(),
    designation: z.string().max(30).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
  }),
});
