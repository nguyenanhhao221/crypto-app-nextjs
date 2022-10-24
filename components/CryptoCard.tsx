import millify from 'millify';
import Image from 'next/image';
import React from 'react';
import { TCrypto } from '../type';
type Props = {
    crypto: TCrypto;
};
import Link from 'next/link';
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
} from '@heroicons/react/24/outline';

export const CryptoCard = ({ crypto }: Props) => {
    const dailyChange = Number(crypto.change);
    const prefix =
        dailyChange >= 0 ? (
            <ChevronDoubleUpIcon className="h-6 w-6" />
        ) : (
            <ChevronDoubleDownIcon className="h-6 w-6" />
        );
    return (
        <li className="cursor-pointer rounded-lg p-4 shadow-xl md:transition-all md:motion-safe:hover:scale-110">
            <Link href={`/cryptocurrencies/${crypto.uuid}`}>
                <div>
                    <div className="flex items-center justify-between border-b border-b-slate-300 py-1">
                        <p>
                            {crypto.rank}. {crypto.name}
                        </p>
                        <Image
                            src={crypto.iconUrl}
                            width="40"
                            height="40"
                            alt="crypto logo"
                            className="h-auto w-10 object-contain object-center"
                        />
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        <div>
                            <p className="text-gray-500">Price</p>
                            <p className="text-2xl font-medium leading-8 tracking-wide">
                                $ {millify(Number(crypto.price))}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Market Cap</p>
                            <p className="text-2xl font-medium leading-8 tracking-wide">
                                $ {millify(Number(crypto.marketCap))}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Daily Change</p>
                            <div
                                className={`flex items-center text-2xl font-medium leading-8 tracking-wide ${
                                    dailyChange >= 0
                                        ? `text-green-400`
                                        : `text-red-400`
                                }`}
                            >
                                {prefix}
                                {millify(Number(dailyChange), {
                                    precision: 2,
                                })}{' '}
                                %
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};
