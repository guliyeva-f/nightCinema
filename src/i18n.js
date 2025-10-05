import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // JSON fayllardan oxuma
  .use(LanguageDetector) // localStorage, querystring və s.
  .use(initReactI18next)
  .init({
    fallbackLng: "az",
    supportedLngs: ["az", "en", "ru"],
    ns: ["common"],
    defaultNS: "common",
    backend: {
      loadPath: "/src/locales/{{lng}}/{{ns}}.json", // 🗂️ JSON fayl yolu
    },
    detection: {
      order: ["querystring", "localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
