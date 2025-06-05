import languages from "../../assets/data/enums/languages.json";
import type { LabeledValue } from "../utils/labeledValue";

export type Language = "en" | "ua";
export const defaultLanguage: Language = "ua";

// array of possible languages with labels
export const getLanguages = (): LabeledValue<Language>[] => {
    return Object.entries(languages as Record<Language, string>).map(([lang, label]) => ({
        value: lang as Language,
        label
    }));
};
