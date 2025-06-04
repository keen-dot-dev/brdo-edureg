import { useRef, useState } from 'react';
import './App.css'
import { Filter, type FilterHandle } from './components/Filter';
import { InstitutionTable } from './components/InstitutionTable';
import { INSTITUTION_TYPES, type InstitutionType } from './services/institutionService';
import { REGIONS } from './types/regions';

const App: React.FC = () => {
    const regionFilterRef = useRef<FilterHandle>(null);
    const typeFilterRef = useRef<FilterHandle>(null);
    const activeFilterRef = useRef<FilterHandle>(null);

    const [filters, setFilters] = useState({
        regions: [] as string[],
        types: [] as InstitutionType[],
        activeStatus: undefined as string | undefined,
    });

    const applyFilters = () => {
        setFilters({
            regions: regionFilterRef.current?.getValues() || [],
            types: typeFilterRef.current?.getValues() || [],
            activeStatus: activeFilterRef.current?.getValues().length === 1
                ? activeFilterRef.current?.getValues()[0]
                : undefined
        })
    };

    return (
        <div>
            <p>
                Region:
                <Filter ref={regionFilterRef} items={REGIONS} />
            </p>
            <p>
                Type:
                <Filter ref={typeFilterRef} items={INSTITUTION_TYPES} />
            </p>
            <p>
                Active:
                <Filter ref={activeFilterRef} items={["true", "false"]} />
            </p>
            <button onClick={applyFilters}>Apply filters</button>
            <InstitutionTable regions={filters.regions} types={filters.types} activeStatus={filters.activeStatus} />
        </div >
    )
}

export default App
