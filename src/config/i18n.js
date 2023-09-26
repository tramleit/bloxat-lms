import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/languages/en.json";
import arTranslations from "@/languages/ar.json";

// Check if a language is saved in local storage or use a default language
const savedLanguage = localStorage.getItem("bxSelectedLanguage");
const defaultLanguage = savedLanguage || "en";

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  resources: {
    en: {
      translation: {
        ...enTranslations,
      },
    },
    ar: {
      translation: {
        ...arTranslations,
      },
    },
  },
});

// Function to change the language and save it to local storage
export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem("bxSelectedLanguage", language);
};

// Ensure that the initial language is set based on local storage
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

export default i18n;
