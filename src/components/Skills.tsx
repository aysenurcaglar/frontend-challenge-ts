import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface Skill {
  name: string;
  description: string;
}

interface SkillsData {
  title: string;
  items: Skill[];
}

export const Skills: React.FC = () => {
  const { apiResponse } = useLanguage();
  const apiSkills = apiResponse.skills as SkillsData;

  return (
    <div id="skills" className="text-left max-w-[80%] xl:max-w-6xl m-auto place-content-between">
      <h2 className="font-bold text-black-heading dark:text-bluish-gray text-4xl mb-4">{apiSkills?.title}</h2>
      <div className="flex flex-col gap-x-4 lg:gap-x-8 lg:flex-row">
        {apiSkills?.items?.map((skill, index) => (
          <div key={index} className="pb-8 lg:pb-16">
            <h3 className="text-dark-purple dark:text-dark-mode-name text-2xl mb-4 font-medium">{skill.name}</h3>
            <p className="text-gray dark:text-white">{skill.description}</p>
          </div>
        ))}
      </div>
      <div className="h-[1px] bg-lilac mb-8 lg:mb-16"></div>
    </div>
  );
};
