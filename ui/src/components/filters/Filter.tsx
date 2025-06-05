import { forwardRef, useImperativeHandle, useState } from 'react';
import type { LabeledValue } from '../../types/utils/labeledValue';

export type FilterProps<T> = {
    options: LabeledValue<T>[];
};

export type FilterHandle<T> = {
    getValues: () => T[] | undefined;
};

// general filter component
export function createFilterComponent<T>() {
    return forwardRef<FilterHandle<T>, FilterProps<T>>(({ options }, ref) => {
        const [checked, setChecked] = useState<T[]>([]);

        const toggleValue = (value: T) => {
            setChecked((prev) => prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
            );
        };

        useImperativeHandle(ref, () => ({
            getValues: () => checked.length === 0 
                ? undefined 
                : checked
        }));

        return (
            <div className="grid grid-cols-5 min-w-full">
                {options.map(({ value, label }) => (
                    <label key={label}>
                        <input
                            type="checkbox"
                            checked={checked.includes(value)}
                            onChange={() => toggleValue(value)}
                        />
                        <span className="ml-1">{label}</span>
                    </label>
                ))}
            </div>
        );
    })
};
