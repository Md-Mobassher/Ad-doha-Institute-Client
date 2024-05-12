export type TCardProps = {
  id: string;
  image?: string | any;
  title: string;
  details?: string;
  btnTitle?: string;
  btnTitle2?: string;
  navigate?: string;
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
};

export type TCardDetails = {
  id: string;
  title: string;
  image: any;
  details: string;
  description: string[] | undefined;
  btnTitle?: string;
  link?: string;
};

export type TBook = {
  id: string;
  title: string;
  image: any;
  link: string;
};
export type TVideo = {
  id: string;
  url: string;
};
export type TMember = {
  id: string;
  image: any;
  name: string;
  designation: string;
  details: string;
  navigate?: string;
};
