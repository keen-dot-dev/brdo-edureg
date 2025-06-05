import React from "react";
import { useTranslation } from "react-i18next";
import { getLanguages } from "../types/enums/language";

export const LanguagePicker: React.FC = () => {
    const { i18n } = useTranslation();

    const languages = getLanguages();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="text-sm space-x-2">
            {languages.map((lang, idx) => (
                <React.Fragment key={lang.value}>
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            changeLanguage(lang.value);
                        }}
                        className={`text-blue-600 hover:underline ${i18n.language === lang.value ? "font-bold" : ""}`}>
                        {lang.label}
                    </a>
                    {idx < languages.length - 1 && <span className="text-neutral-500">|</span>}
                </React.Fragment>
            ))}
        </div>
    );
};
