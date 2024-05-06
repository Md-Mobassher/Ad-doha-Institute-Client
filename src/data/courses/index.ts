import assets from "@/assets";
import { v4 as uuidv4 } from "uuid";

export const coursesData = [
  {
    id: uuidv4(),
    title: "নওমুসলিম মৌলিক শিক্ষা",
    image: assets.courses.newMuslim,
  },

  {
    id: uuidv4(),
    title: "শিশুদের দোহা মক্তব",
    image: assets.courses.childMoktob,
  },
  {
    id: uuidv4(),
    title: "বয়স্কদের দোহা মক্তব",
    image: assets.courses.oldMoktob,
  },
  {
    id: uuidv4(),
    title: "মহিলাদের দোহা মক্তব",
    image: assets.courses.ladyMoktob,
  },
];

export const coursesDataEn = [
  {
    id: uuidv4(),
    title: "Neo-Muslim basic education",
    image: assets.courses.newMuslim,
  },

  {
    id: uuidv4(),
    title: "Children's Doha Maktab",
    image: assets.courses.childMoktob,
  },
  {
    id: uuidv4(),
    title: "Doha Maktab for the elderly",
    image: assets.courses.oldMoktob,
  },
  {
    id: uuidv4(),
    title: "Women's Doha Maktab",
    image: assets.courses.ladyMoktob,
  },
];
