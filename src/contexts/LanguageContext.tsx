import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';

// Define type for the API response object
interface APIResponse {
  [key: string]: any;
}

interface LanguageContextType {
  language: string;
  switchLanguage: () => void;
  apiResponse: APIResponse;
  updateApiResponse: (data: APIResponse) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [apiResponse, setApiResponse] = useState<APIResponse>({});
  const [loading, setLoading] = useState(true);

  const updateApiResponse = (data: APIResponse) => {
    setApiResponse(data);
  };

  const fetchData = async () => {
    try {
      const languageFile = await import(`../mocks/${language}.json`);
      const response = await axios.post('https://reqres.in/api/workintech', languageFile,
      {
        headers: {
          'x-api-key': 'myapikey',
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);
      updateApiResponse(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, [language]);

  const switchLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, apiResponse, updateApiResponse }}>
      {children}
    </LanguageContext.Provider>
  );
};
