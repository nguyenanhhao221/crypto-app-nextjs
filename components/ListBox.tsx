import React from 'react';

type Props = {
    data: string[];
    setTimePeriod: React.Dispatch<React.SetStateAction<string>>;
};
export function MyListbox({ data, setTimePeriod }: Props) {
    return (
        <select
            title="Select Time Period"
            placeholder="Select Time Period"
            defaultValue={data[0]}
            className={`w-28 border py-2 px-4 ring-teal-100`}
            onChange={(e) => setTimePeriod(e.target.value)}
        >
            {data.map((data) => (
                <option key={data} value={data}>
                    {data}
                </option>
            ))}
        </select>
    );
}
