import Link from 'next/link';
import React from 'react';

type Props = {
    links: {
        name: string;
        type: string;
        url: string;
    }[];
    name: string;
};

export const CryptoLinks = ({ links, name }: Props) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-500">{`${name} Links`}</h2>
            <ul className="flex flex-col justify-center divide-y-2">
                {links.map(({ url, name, type }) => (
                    <li
                        key={url}
                        className="flex items-center justify-between py-4 text-sm md:text-base"
                    >
                        <p className="capitalize">{type}</p>
                        <Link href={url} passHref>
                            <a
                                target={'_blank'}
                                rel="noopener noreferrer"
                                title={name}
                                className="text-blue-500"
                            >
                                {name}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
