import { USER_ROLE } from "@/constant/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TGender = "male" | "female" | "other";
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TCardProps = {
  _id: string;
  image?: string | any;
  title: string;
  details?: string;
  btnTitle?: string;
  btnTitle2?: string;
  navigate?: string;
  navigation?: string;
  link?: string;
};

export type TSliderProps = {
  items: TCardProps[];
  slidesPerView?: number;
  spaceBetween?: number;
  btnTitle?: string;
  btnTitle2?: string;
  navigate?: string;
};

export type TButtonProps = {
  btnTitle: string;
  title?: string;
  id?: string;
  navigate?: string;
  variant?: "text" | "outlined" | "contained";
};

export type TCardDetails = {
  _id: string;
  title: string;
  image: any;
  details: string;
  description: string[] | undefined;
  btnTitle?: string;
  link?: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage?: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  success?: boolean;
  message?: string;
  statusCode?: number;
  data: any;
  meta?: TMeta;
};

export type TGenericErrorResponse = {
  success?: boolean;
  statusCode: number;
  message: string;
  errorSources: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type TTeacher = {
  _id: string;
  name: string;
  designation: string;
  image: any;
  position: number;
  opinion?: string;
  createdAt: string;
  updatedAt: string;
  navigate?: string;
};

export type TItem = {
  label: string;
  value: string | number;
};

export type TBanner = {
  _id: string;
  title?: string;
  subTitle?: string;
  image: string;
  position: number;
};
