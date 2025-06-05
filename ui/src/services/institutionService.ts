import httpClient from "../lib/api/httpClient";
import { SCHOOL_DEACTIVATE_PATH, SCHOOLS_CONTROLLER } from "../lib/constants";

import type { Institution } from "../types/entities/institution";
import type { InstitutionsFilter } from "../types/filters/institutionsFilter";
import type { CreateInstitutionRequest } from "../types/requests/createInstiturionRequest";

export async function createInstitution(data: CreateInstitutionRequest): Promise<Institution> {
    const res = await httpClient.post<Institution>(SCHOOLS_CONTROLLER, data);
    return res.data;
}

export async function getInstitutions(filter: InstitutionsFilter): Promise<Institution[]> {
    const params = new URLSearchParams();

    filter.regions?.forEach((name) => params.append("region", name));
    filter.types?.forEach((type) => params.append("type", type));
    if (filter.activeStatus !== undefined) {
        params.append("isActive", String(filter.activeStatus));
    }

    const res = await httpClient.get<Institution[]>(SCHOOLS_CONTROLLER, { params });
    return res.data;
}

export async function deactivateInstitution(id: number): Promise<Institution> {
    const res = await httpClient.patch<Institution>(SCHOOLS_CONTROLLER + `/${id}` + SCHOOL_DEACTIVATE_PATH);
    return res.data;
}
