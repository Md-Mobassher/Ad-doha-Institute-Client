export type TCardProps = {
  id: string;
  image?: string | any;
  title?: string;
  details?: string;
  btnTitle?: string;
  href?: string;
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
  title: string;
  id?: string;
  navigate?: string;
};
