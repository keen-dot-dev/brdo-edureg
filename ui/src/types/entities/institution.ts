import type { InstitutionType } from "../enums/institutionType";
import type { Region } from "./region";

export type Institution = {
    id: number;
    edrpou: number;
    name: string;
    region: Region;
    type: InstitutionType;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

