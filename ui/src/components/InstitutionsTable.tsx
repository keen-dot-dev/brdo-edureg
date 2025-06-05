import { useEffect, useState } from "react";
import { deactivateInstitution, getInstitutions } from "../services/institutionService";
import type { Institution } from "../types/entities/institution";
import type { InstitutionsFilter } from "../types/filters/institutionsFilter";
import { useTranslation } from "react-i18next";
import { getInstitutionTypeLabel } from "../types/enums/institutionType";
import { NewInstitutionModal } from "./modals/NewInstitutionModal";


export const InstitutionsTable: React.FC<InstitutionsFilter> = ({ regions, types, activeStatus }) => {
    const { t } = useTranslation(["fields", "activeStatus", "deactivation", "institutions"]);
    const [reload, setReload] = useState(false);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [creatingInstitution, setCreatingInstitution] = useState(false);

    useEffect(() => {
        getInstitutions({ regions, types, activeStatus }).then(setInstitutions);
    }, [regions, types, activeStatus, reload]);

    const dateFormat = (timestamp: string): string => {
        const date = new Date(timestamp);
        const pad = (n: number) => n.toString().padStart(2, '0');

        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    const onNewInstitutionSubmit = () => {
        setCreatingInstitution(false);
        setReload(!reload);
    }

    return (
        <div>
            <div className="flex justify-between mt-6 mb-3">
                <h2 className="font-bold text-2xl">{t("institutions:title")}:</h2>
                <button onClick={() => { setCreatingInstitution(true) }}>{t("institutions:create")}</button>
                {creatingInstitution && <NewInstitutionModal onSubmit={onNewInstitutionSubmit} onCancel={() => setCreatingInstitution(false)} />}
            </div>
            <table className="min-w-full border-b-1 border-neutral-500">
                <thead className="min-w-full border-1">
                    <tr>
                        <th className="px-1">{t("fields:id")}</th>
                        <th className="px-1">{t("fields:edrpou")}</th>
                        <th className="px-1">{t("fields:name")}</th>
                        <th className="px-1">{t("fields:region")}</th>
                        <th className="px-1">{t("fields:type")}</th>
                        <th className="px-1">{t("fields:status")}</th>
                        <th className="px-1">{t("fields:createdAt")}</th>
                        <th className="px-1">{t("fields:updatedAt")}</th>
                        <th className="px-1">{t("fields:controls")}</th>
                    </tr>
                </thead>
                <tbody>
                    {institutions.map((i) => (
                        <tr key={i.id} className="even:bg-neutral-700">
                            <td className="border-x border-neutral-500 text-center px-1">{i.id}</td>
                            <td className="border-x border-neutral-500 text-center px-1">{i.edrpou}</td>
                            <td className="border-x border-neutral-500 px-1">{i.name}</td>
                            <td className="border-x border-neutral-500 px-1">{i.region?.name}</td>
                            <td className="border-x border-neutral-500 px-1">{getInstitutionTypeLabel(i.type)}</td>
                            <td className="border-x border-neutral-500 text-center px-1">{i.active ? t("activeStatus:active") : t("activeStatus:inactive")}</td>
                            <td className="border-x border-neutral-500 text-center px-1">{dateFormat(i.createdAt)}</td>
                            <td className="border-x border-neutral-500 text-center px-1">{dateFormat(i.updatedAt)}</td>
                            <td className="border-x border-neutral-500 text-center px-1">
                                <a className={i.active ? "hover:cursor-pointer underline" : "pointer-events-none !text-neutral-500 cursor-default"} onClick={() => {
                                    if (i.active && confirm(t("deactivation:confirmation")))
                                        deactivateInstitution(i.id)
                                            .then(() => setReload(!reload));
                                }}>{t("deactivation:deactivate")}</a>
                            </td>
                        </tr>
                    ))}
                    <tr className={`even:bg-neutral-700 ${institutions.length > 0 ? "hidden" : ""}`}>
                        <td colSpan={9} className="border-x border-neutral-500 text-center py-5">{t("institutions:noData")}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
}

