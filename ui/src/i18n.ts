import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { defaultLanguage } from "./types/enums/language";

i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: defaultLanguage,
        ns: ["translation", "activeStatus", "fields", "deactivation", "filters", "institutions", "newInstitution"],
        defaultNS: "translation",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
