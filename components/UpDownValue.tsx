import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
type Props = {
    value?: string | number;
    suffix: string;
};

export const UpDownValue = ({ value, suffix }: Props) => {
    if (!value) return <></>;
    const prefix = Number(value) >= 0 ? <ChevronUpIcon /> : <ChevronDownIcon />;
    const fillColor = Number(value) >= 0 ? `bg-green-400` : `bg-red-400`;
    return (
        <div className={`flex justify-end py-2 text-white`}>
            <p
                className={`inline-flex items-center rounded-lg p-2 ${fillColor}`}
            >
                <span className="h-6 w-6">{prefix}</span>
                <span>{value}</span>
                <span>{suffix}</span>
            </p>
        </div>
    );
};
