import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface BasicInformationItem {
  label: string;
  value: string;
}

interface BasicInformation {
  title: string;
  items: BasicInformationItem[];
}

interface AboutMe {
  title: string;
  paragraphs: string[];
}

interface ProfileData {
  title: string;
  basicInformation: BasicInformation;
  aboutMe: AboutMe;
}

export const Profile: React.FC = () => {
  const { apiResponse } = useLanguage();
  const { title, basicInformation, aboutMe } = apiResponse?.profile as ProfileData;

  return (
    <div className="text-left max-w-[80%] xl:max-w-6xl m-auto">
      <h2 className="font-bold text-black-heading dark:text-bluish-gray text-4xl mb-4">{title}</h2>
      <div className="flex flex-col gap-x-16 lg:flex-row">
        <div className="pb-8 lg:pb-16">
          <h3 className="text-dark-purple dark:text-dark-mode-name text-2xl font-medium">{basicInformation.title}</h3>
          <div className="flex flex-col place-content-between">
            {basicInformation.items.map((item, index) => (
              <div key={index} className="flex flex-row gap-x-4 lg:gap-x-8 text-black-heading dark:text-white">
                <p className="my-4 w-[150px] font-bold">{item.label}</p>
                <p className="my-4 w-[200px] lg:w-[250px]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-lg pb-8 lg:pb-16">
          <h3 className="text-dark-purple dark:text-dark-mode-name text-2xl mb-4 font-medium">{aboutMe.title}</h3>
          {aboutMe.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray dark:text-white mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="h-[1px] bg-lilac mb-8 lg:mb-16"></div>
    </div>
  );
};
