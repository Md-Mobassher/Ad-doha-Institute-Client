import { USER_ROLE } from "@/constant/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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

export type TBook = {
  _id: string;
  title: string;
  image: any;
  url: string;
};
export type TVideo = {
  _id: string;
  title?: string;
  url: string;
};
export type TAcademicDepartment = {
  _id: string;
  name: string;
  image: string;
  position: number;
};
export type TMember = {
  _id: string;
  image: any;
  name: string;
  designation: string;
  navigate?: string;
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
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
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type TTeacher = {
  _id: string;
  name: string;
  designation: string;
  image: any;
};

export type TOpinion = {
  _id: string;
  name: string;
  designation: string;
  image: any;
  opinion: string;
};
