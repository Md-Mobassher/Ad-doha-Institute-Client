import assets from "@/assets";
import { v4 as uuidv4 } from "uuid";

export const advisoryCommitteData = [
  {
    id: uuidv4(),
    name: "মাওলানা মুহাম্মদ সালমান",
    image: assets.advisoryCommittees.muhammadSalman,
    designation:
      "প্রধান উপদেষ্টা - আদ-দোহা ইনস্টিটিউট, বিশিষ্ট খলিফা, সাইয়েদ আবুল হাসান আলী নদভী (রহ.) ও মুহতামিম, মাদ্রাসা দারুল রাশাদ, মিরপুর, ঢাকা।",
    details: "",
  },
  {
    id: uuidv4(),
    name: "শাইখ আবু হুরায়রা আজহারী",
    image: assets.advisoryCommittees.abuHurayra,
    designation: "উপদেষ্টা - আদ-দোহা ইনস্টিটিউট",
    details: "",
  },
  {
    id: uuidv4(),
    name: "মাওলানা রুহুল আমিন সাদী",
    image: assets.advisoryCommittees.ruhulamin,
    designation: "উপদেষ্টা - আদ-দোহা ইনস্টিটিউট",
    details: "",
  },
  {
    id: uuidv4(),
    name: "মুফতি সাইফুল ইসলাম",
    image: assets.advisoryCommittees.saifulIslam,
    designation: "খতিব মসজিদ উত তাকওয়া, ধানমন্ডি",
    details: "",
  },
];
