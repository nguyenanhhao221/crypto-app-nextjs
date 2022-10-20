import Image from 'next/future/image';
import React from 'react';
import { TCrypto } from '../type';
type Props = {
  crypto: TCrypto;
};
export const CryptoCard = ({ crypto }: Props) => {
  return (
    <li className="shadow-2xl">
      <div className="flex justify-between items-center">
        <p>
          {crypto.rank}. {crypto.name}
        </p>
        <Image
          src={crypto.iconUrl}
          width="40"
          height="40"
          alt="crypto logo"
          className="object-contain object-center w-10 h-auto"
        />
      </div>
    </li>
  );
};
