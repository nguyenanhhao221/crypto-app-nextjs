import millify from 'millify';
import Image from 'next/future/image';
import React from 'react';
import { TCrypto } from '../type';
type Props = {
  crypto: TCrypto;
};
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const CryptoCard = ({ crypto }: Props) => {
  const dailyChange = Number(crypto.change);
  const prefix = dailyChange >= 0 ? <CaretUpOutlined /> : <CaretDownOutlined />;
  return (
    <li className="shadow-xl p-4 cursor-pointer rounded-lg md:motion-safe:hover:scale-110 md:transition-all">
      <Link href={`/cryptocurrencies/${crypto.uuid}`}>
        <div>
          <div className="flex justify-between items-center border-b py-1 border-b-slate-300">
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
          <div className="flex flex-col gap-4 py-4">
            <div>
              <p className="text-gray-500">Price</p>
              <p className="text-2xl font-medium tracking-wide leading-8">
                $ {millify(Number(crypto.price))}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Market Cap</p>
              <p className="text-2xl font-medium tracking-wide leading-8">
                $ {millify(Number(crypto.marketCap))}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Daily Change</p>
              <div
                className={`text-2xl font-medium tracking-wide leading-8 flex items-center ${
                  dailyChange >= 0 ? `text-green-400` : `text-red-400`
                }`}
              >
                {prefix}
                {millify(Number(dailyChange), { precision: 2 })} %
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
