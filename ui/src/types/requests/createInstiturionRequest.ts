import type { InstitutionType } from "../enums/institutionType";

export type CreateInstitutionRequest = {
    edrpou: number;
    name: string;
    region: string;
    type: InstitutionType;
};

