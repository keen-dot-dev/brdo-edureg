import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { InstitutionsFilter } from "./types/filters/institutionsFilter";
import { InstitutionsTable } from "./components/InstitutionsTable";
import { FiltersArea } from "./components/filters/FiltersArea";
import { LanguagePicker } from "./components/LanguagePicker";

const App: React.FC = () => {
    const { t } = useTranslation(["translation", "activeStatus"]);

    const [filters, setFilters] = useState<InstitutionsFilter>({
        regions: undefined,
        types: undefined,
        activeStatus: undefined
    });

    const onFilter = useCallback((newFilters: InstitutionsFilter) => {
        setFilters(newFilters);
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-center my-4">
                {t("title")}
            </h2>
            <LanguagePicker />
            <FiltersArea onFilter={onFilter} />
            <InstitutionsTable
                regions={filters.regions}
                types={filters.types}
                activeStatus={filters.activeStatus} />
        </div>
    );
}

export default App;
