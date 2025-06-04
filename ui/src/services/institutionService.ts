import axios from "axios";

const ENDPOINT_URL = "http://localhost:8080/schools";

export const INSTITUTION_TYPES = [ "SCHOOL", "GYMNASIUM", "LYCEUM" ];
export type InstitutionType = typeof INSTITUTION_TYPES[number];

export type Region = {
    id: number;
    name: string;
}

export type Institution = {
    id: number;
    edrpou: number;
    name: string;
    region: Region;
    type: InstitutionType;
    isActive: boolean;
}

export type CreateInstitutionRequest = {
    edrpou: number;
    name: string;
    region: string;
    type: InstitutionType;
}

export async function createInstitution(request: CreateInstitutionRequest) {
    axios.post(ENDPOINT_URL, request);
}

export async function getInstitutions(filters: {
    regions?: string[];
    types?: InstitutionType[];
    activeStatus?: string;
}): Promise<Institution[]> {
    const params = new URLSearchParams();

    filters.regions?.forEach((name) => params.append("region", name));
    filters.types?.forEach((type) => params.append("type", type));
    if (filters.activeStatus !== undefined) {
        params.append("isActive", String(filters.activeStatus));
    }

    const res = await axios.get<Institution[]>(ENDPOINT_URL, { params });
    return res.data;
}

export async function deactivateInstitution(id: number): Promise<Institution> {
    const res = await axios.patch<Institution>(ENDPOINT_URL + "/" + id + "/deactivate");
    return res.data;
}
