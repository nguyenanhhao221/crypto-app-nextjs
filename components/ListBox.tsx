import React from 'react';

type Props = {
    data?: string[];
    setStateFunc: React.Dispatch<React.SetStateAction<string>>;
    selectText: string;
    defaultValue?: string;
};
export function MyListbox({
    data,
    setStateFunc,
    selectText,
    defaultValue,
}: Props) {
    if (!data) return <></>;
    return (
        <>
            <select
                title={selectText}
                placeholder={selectText}
                defaultValue={defaultValue && defaultValue}
                className={`border py-2 px-4 ring-teal-100`}
                onChange={(e) => setStateFunc && setStateFunc(e.target.value)}
            >
                {data.map((data) => (
                    <option key={data} value={data}>
                        {data}
                    </option>
                ))}
            </select>
        </>
    );
}
