"use client";
import { useState } from "react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState("bn");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "bn" : "en"));
  };

  return (
    <button className=" border border-primary " onClick={toggleLanguage}>
      {language === "en" ? (
        <div className="flex justify-between items-center">
          <p className="bg-white px-1">বাং</p>
          <p className="bg-primary px-1 text-white">En</p>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="bg-primary text-white px-1">বাং</p>
          <p className="bg-white px-1 text-black">En</p>
        </div>
      )}
    </button>
  );
};

export default LanguageToggle;
