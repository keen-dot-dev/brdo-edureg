import type React from "react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import regions from "../../assets/data/regions.json";
import { getInstitutionTypes, type InstitutionType } from "../../types/enums/institutionType";
import { createInstitution } from "../../services/institutionService";

export type NewInstitutionModalProps = {
    onSubmit: () => void,
    onCancel: () => void
};

export const NewInstitutionModal: React.FC<NewInstitutionModalProps> = ({ onSubmit, onCancel }) => {
    const { t } = useTranslation(["fields", "newInstitution"]);

    const [edrpou, setEdrpou] = useState("");
    const [name, setName] = useState("");
    const [selectedType, setSelectedType] = useState<InstitutionType | null>(null);
    const [regionSearch, setRegionSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const filteredItems = useMemo(
        () =>
            (regions as string[]).filter((region) =>
                region.toLowerCase().includes(regionSearch.toLowerCase())
            ),
        [regionSearch]
    );

    const submit = () => {
        if (selectedRegion === null || selectedType === null) {
            alert(t("newInstitution:fillAll"));
            return;
        }
        createInstitution({
            edrpou: Number(edrpou),
            name: name,
            region: selectedRegion,
            type: selectedType
        }).then(onSubmit);
    };
    const cancel = () => {
        onCancel();
    }

    return (
        <div
            onClick={() => cancel()}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-700 rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{t("newInstitution:title")}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}>
                    <label className="block mb-2">
                        {t("fields:edrpou")}:
                        <input
                            type="text"
                            name="edrpou"
                            value={edrpou}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, "");
                                setEdrpou(numericValue);
                            }}
                            inputMode="numeric"
                            pattern="\d*"
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </label>

                    <label className="block mb-4">
                        {t("fields:name")}:
                        <input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </label>

                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">{t("fields:region")}:</label>
                            <input
                                type="text"
                                placeholder={`${t("newInstitution:search")}...`}
                                value={regionSearch}
                                onChange={(e) => setRegionSearch(e.target.value)}
                                className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required />
                            <ul className="border rounded min-h-32 max-h-32 overflow-auto">
                                {filteredItems.length > 0
                                    ? (filteredItems.map((item) => (
                                        <li
                                            key={item}
                                            onClick={() => {
                                                setSelectedRegion(item);
                                                setRegionSearch(item);
                                            }}
                                            className={`px-3 py-1 cursor-pointer hover:bg-neutral-600 ${selectedRegion === item ? "bg-neutral-500" : ""}`} >
                                            {item}
                                        </li>
                                    )))
                                    : (
                                        <li className="px-3 py-1 text-neutral-500">
                                            {t("newInstitution:notFound")}
                                        </li>
                                    )}
                            </ul>
                        </div>

                        <div className="flex-1">
                            <label className="block mb-1 font-medium">{t("fields:type")}</label>
                            <select
                                value={selectedType ?? ""}
                                onChange={(e) => setSelectedType(e.target.value as InstitutionType)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required >
                                <option value="" disabled>
                                    {t("newInstitution:chooseType")}...
                                </option>
                                {getInstitutionTypes().map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => cancel()}
                            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" >
                            {t("newInstitution:cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" >
                            {t("newInstitution:submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
