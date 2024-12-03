import { z } from "zod";
import { TBloodGroup, TGender, TUserName } from "./common";

export type TAdmin = {
  id: string;
  _id: string;
  designation: string;
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

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20),
});

export const createAdminValidationSchema = z.object({
  password: z.string().min(6).max(20),
  admin: z.object({
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

export const updateAdminValidationSchema =
  createAdminValidationSchema.partial();

export type CreateAdminInput = z.infer<typeof createAdminValidationSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminValidationSchema>;
