import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface FooterData {
  contactHeader: string;
  contactEmail: string;
  personalBlog: string;
  github: string;
  linkedin: string;
  links: {
    personalBlog: string;
    github: string;
    linkedin: string;
  };
}

export const Footer: React.FC = () => {
  const { apiResponse, language } = useLanguage();
  const { contactHeader, contactEmail, personalBlog, github, linkedin, links } = apiResponse?.footer as FooterData;

  const isTurkish = language === 'tr';

  return (
    <footer id="footer" className="bg-gray-light dark:bg-dark-footer-bg w-full">
      <div className="max-w-[80%] xl:max-w-6xl m-auto py-16">
        <h2 className={`font-bold text-black-heading dark:text-bluish-gray text-left text-4xl ${isTurkish ? 'max-w-lg' : 'max-w-md'}`}>{contactHeader}</h2>
        <div className="flex flex-col lg:flex-row pt-16 pb-8">
          <a className="text-mail-red dark:text-lilac text-left mb-16 lg:mb-0 mr-auto" href={`mailto:${contactEmail}`}>👉 <span className="underline">{contactEmail}</span></a>
          <nav className="flex items-center space-x-4 lg:space-x-8 ml-auto">
            <a href={links.personalBlog} className='text-black-heading dark:text-dark-mode-hire'>{personalBlog}</a>
            <a href={links.github} className='text-green dark:text-dark-mode-green'>{github}</a>
            <a href={links.linkedin} className='text-linkedin-blue dark:dark-mode-linkedin'>{linkedin}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
