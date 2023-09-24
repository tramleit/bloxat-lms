// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/languages/en.json"; // Import your Arabic translations
import arTranslations from "@/languages/ar.json"; // Import your Arabic translations

// Check if a language is saved in local storage, or use a default language
const LANGUAGE_LOCAL_STORAGE_KEY = "bxSelectedLanguage"; // Define a local storage key

// Check if we are in a browser context and if a language is saved in local storage
const savedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);

const defaultLanguage = savedLanguage || "en";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: defaultLanguage, // Set the default language
    resources: {
      en: {
        translation: {
          // English translations here
          ...enTranslations,
        },
      },
      ar: {
        translation: {
          // Arabic translations here
          ...arTranslations,
        },
      },
    },
  });

// Function to change the language and save it to local storage
export const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, language);
};

export default i18n;
