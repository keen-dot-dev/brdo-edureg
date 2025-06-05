import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import regions from "../../assets/data/regions.json";
import type { LabeledValue } from "../../types/utils/labeledValue";
import type { InstitutionsFilter } from "../../types/filters/institutionsFilter";
import { createFilterComponent, type FilterHandle } from "./Filter";
import { getInstitutionTypes, type InstitutionType } from "../../types/enums/institutionType";

export type FiltersAreaProps = {
    onFilter: (filters: InstitutionsFilter) => void
}

export const FiltersArea: React.FC<FiltersAreaProps> = React.memo(({ onFilter }) => {
    const { t } = useTranslation(["fields", "filters"]);

    const [reload, setReload] = useState(false);

    const RegionFilter = createFilterComponent<string>();
    const regionFilterRef = useRef<FilterHandle<string>>(null);
    const regionFilterOptions: LabeledValue<string>[] = (regions as string[])
        .map(region => ({ value: region, label: region }));

    const TypeFilter = createFilterComponent<InstitutionType>();
    const typeFilterRef = useRef<FilterHandle<InstitutionType>>(null);
    const typeFilterOptions: LabeledValue<InstitutionType>[] = getInstitutionTypes();

    const ActiveStatusFilter = createFilterComponent<boolean>();
    const activeStatusFilterRef = useRef<FilterHandle<boolean>>(null);
    const actvieStatusFilterOptions: LabeledValue<boolean>[] = [
        { value: true, label: t("activeStatus:active") },
        { value: false, label: t("activeStatus:inactive") }
    ];

    const applyFilters = () => {
        const activeStatusSelected = activeStatusFilterRef.current?.getValues();
        onFilter({
            regions: regionFilterRef.current?.getValues(),
            types: typeFilterRef.current?.getValues(),
            activeStatus: activeStatusSelected?.length === 1
                ? activeStatusSelected?.[0]
                : undefined
        })
    };
    const resetFilters = () => {
        setReload(!reload);
        onFilter({});
    };

    return (
        <div className="container flex flex-col">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{t("filters:title")}:</h2>
                <div>
                    <button className="mr-4" onClick={resetFilters}>{t("filters:cancel")}</button>
                    <button onClick={applyFilters}>{t("filters:apply")}</button>
                </div>
            </div>
            <div className="px-5">
                <div className="flex my-3 rounded-lg border-neutral-600 border-1 p-2">
                    <div className="font-bold min-w-[6em]">{t("fields:region")}:</div>
                    <RegionFilter ref={regionFilterRef} options={regionFilterOptions} />
                </div>
                <div className="flex my-3 rounded-lg border-neutral-600 border-1 p-2">
                    <div className="font-bold min-w-[6em]">{t("fields:type")}:</div>
                    <TypeFilter ref={typeFilterRef} options={typeFilterOptions} />
                </div>
                <div className="flex my-3 rounded-lg border-neutral-600 border-1 p-2">
                    <div className="font-bold min-w-[6em]">{t("fields:status")}:</div>
                    <ActiveStatusFilter ref={activeStatusFilterRef} options={actvieStatusFilterOptions} />
                </div>
            </div>
        </div>
    );
})
