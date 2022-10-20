import React from 'react';
import type { TStats } from '../type';
type Props = {
    name: string;
    statsArr: TStats[];
    variants?: 'others';
};
export const Stats = ({ name, statsArr, variants }: Props) => {
    return (
        <div className="py-4">
            <div>
                <h3 className="text-center font-semibold capitalize text-blue-500 md:text-left md:text-2xl">
                    {variants === 'others' ? `other stats` : `value statistics`}
                </h3>
                <p className="text-center capitalize md:text-left">
                    {variants === 'others'
                        ? `Other stats related to ${name}`
                        : `An overview showing of ${name}`}
                </p>
            </div>
            <ul className="flex flex-col divide-y-2">
                {statsArr.map(({ title, value, icon }) => (
                    <li
                        key={typeof value !== 'string' ? title : value}
                        className="flex justify-between py-4 md:py-6"
                    >
                        <div className="flex items-center gap-1">
                            {icon}
                            <p className="inline text-sm md:text-base">
                                {title}
                            </p>
                        </div>
                        <div className="text-sm font-bold md:text-base">
                            {value}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
