import institutionTypeLabels from "../../assets/data/enums/institutionTypes.json";
import type { Language } from "./language";
import type { LabeledValue } from "../utils/labeledValue";
import i18n from "../../i18n";

export type InstitutionType = "SCHOOL" | "GYMNASIUM" | "LYCEUM";
export const defaultInstitutionType: InstitutionType = "SCHOOL";

// translated enum label
export const getInstitutionTypeLabel = (institutionType: InstitutionType) => {
    const labels = institutionTypeLabels as Record<Language, Record<InstitutionType, string>>;
    return labels[i18n.language as Language][institutionType];
};

// array of possible institution types with translated labels
export const getInstitutionTypes = (): LabeledValue<InstitutionType>[] => {
    const labels = institutionTypeLabels as Record<Language, Record<InstitutionType, string>>;
    return Object.entries(labels[i18n.language as Language]).map(([type, label]) => ({
        value: type as InstitutionType,
        label
    }));
};
