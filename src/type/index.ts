export type TCardProps = {
  id: string;
  image?: string | any;
  title: string;
  details?: string;
  btnTitle?: string;
  navigate?: string;
};

export type TSliderProps = {
  items: TCardProps[];
  slidesPerView?: number;
  spaceBetween?: number;
  btnTitle?: string;
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
