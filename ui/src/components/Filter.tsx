import { forwardRef, useImperativeHandle, useState } from 'react';

type FilterProps = {
    items: string[] | Record<string, string>;
};

export type FilterHandle = {
    getValues: () => string[];
};

export const Filter = forwardRef<FilterHandle, FilterProps>(({ items }, ref) => {
    const filterItems: { label: string; value: string }[] = Array.isArray(items)
        ? items.map((item) => ({ label: item, value: item }))
        : Object.entries(items).map(([label, value]) => ({ label, value }));

    const [checked, setChecked] = useState<string[]>([]);

    const toggleValue = (value: string) => {
        setChecked((prev) => prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
    };

    useImperativeHandle(ref, () => ({
        getValues: () => checked
    }));

    return (
        <div style={{display: "inline"}}>
            {filterItems.map(({ label, value }) => (
                <label key={value}>
                    <input
                        type="checkbox"
                        checked={checked.includes(value)}
                        onChange={() => toggleValue(value)}
                    />
                    <span>{label}</span>
                </label>
            ))}
        </div>
    );
});
