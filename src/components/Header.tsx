import React from "react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "react-toastify";
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';

interface ApiResponse {
  header: {
    lightMode: string;
    darkMode: string;
    language: string;
    skills: string;
    projects: string;
    hireMe: string;
  };
  notifications: {
    pending: string;
    success: string;
  };
}

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { switchLanguage, apiResponse } = useLanguage();

  const apiHeader = apiResponse?.header as ApiResponse["header"];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    switchLanguage();

    const notif = toast.loading(
      apiResponse ? apiResponse.notifications.pending : 'Hmm...',
      { pauseOnHover: false, theme: darkMode ? "dark" : "light" }
    );

    if (apiResponse && Object.keys(apiResponse).length !== 0) {
      toast.update(notif, {
        render: apiResponse.notifications.success,
        type: "success",
        isLoading: false,
        delay: 1000,
        autoClose: 2000,
      });
    } else {
      toast.update(notif, {
        render: 'Oops :(',
        type: "error",
        isLoading: false,
        delay: 1000,
        autoClose: 2000,
      });
    }
  };

  return (
    <header className='flex flex-col max-w-[80%] xl:max-w-6xl m-auto justify-between'>
      <div className='flex items-center space-x-2 ml-auto my-8'>
        <div
          className='relative w-10 h-5 flex items-center cursor-pointer transition-colors duration-300 rounded-full bg-toggle-purple dark:bg-toggle-gray'
          onClick={toggleDarkMode}
        >
          <div
            className='w-4 h-4 cursor-pointer transition-transform duration-300 transform'
            style={{ transform: darkMode ? 'translateX(30%)' : 'translateX(125%)' }}
          >
            {darkMode ? <img src={moon} /> : <img src={sun} />}
          </div>
        </div>

        <span className='dark:text-light-mode text-gray-dark font-medium tracking-wider'>
          {darkMode ? apiHeader?.lightMode : apiHeader?.darkMode}
        </span>

        <span className="text-gray-dark">|</span>

        <a href="#" onClick={handleClick} className='dark:text-lilac text-toggle-purple font-medium tracking-wider'>
          {apiHeader?.language}
        </a>
      </div>

      <div className='flex items-center'>
        <div
          className='h-10 w-10 rounded-full flex items-center justify-center bg-logo-lilac dark:bg-toggle-purple mr-auto'
        >
          <span className='dark:text-dark-logo-font text-logo-purple transform rotate-45'>A</span>
        </div>
        <nav className="flex items-center space-x-2 lg:space-x-16 ml-auto">
          <a href="#" onClick={() => scrollToSection('skills')} className='text-gray'>{apiHeader?.skills}</a>
          <a href="#" onClick={() => scrollToSection('projects')} className='text-gray'>{apiHeader?.projects}</a>
          <a href="#" onClick={() => scrollToSection('footer')} className='text-navy-blue px-4 py-2 border border-navy-blue rounded-md dark:bg-white'>{apiHeader?.hireMe}</a>
        </nav>
      </div>
    </header>
  );
};
