import { useEffect } from "react";
import i18n from "@/config/i18n";

const LanguageInitializer = () => {
  useEffect(() => {
    // Check if a language is saved in local storage
    const savedLanguage = localStorage.getItem("bxSelectedLanguage");

    // Set the language to the saved language or default to 'en'
    i18n.changeLanguage(savedLanguage || "en");
  }, []); // Run this effect only once when the component mounts

  return null; // This component doesn't render anything, so return null
};

export default LanguageInitializer;
