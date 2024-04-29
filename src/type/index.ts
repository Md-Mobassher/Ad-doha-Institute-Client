export type TCardProps = {
  id: string;
  img?: any;
  title?: string;
  details?: string;
  btn?: string;
  href?: string;
};

export type TSliderProps = {
  items: TCardProps[];
  slidesPerView?: number;
  spaceBetween?: number;
};
