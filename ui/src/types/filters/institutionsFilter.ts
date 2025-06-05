import type { InstitutionType } from "../enums/institutionType";

export type InstitutionsFilter = {
    regions?: string[];
    types?: InstitutionType[];
    activeStatus?: boolean;
};
