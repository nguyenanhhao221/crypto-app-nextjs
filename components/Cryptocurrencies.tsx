import { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Spin, Avatar, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Link from 'next/link';
import millify from 'millify';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { CryptoCard } from './CryptoCard';
import { TCrypto } from '../type';

type Props = { simplified: boolean; cryptos: TCrypto[] };
type T = {
  [key: string]: number | string;
  price: number;
  marketCap: number;
  change: number;
};

const Cryptocurrencies = ({ simplified, cryptos }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const cryptosToRender = cryptos.slice(0, count);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      {/* Add search box only when not in simplified  */}
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <ul className="grid grid-cols-2">
        {cryptosToRender.map((crypto) => (
          <CryptoCard key={crypto.name} crypto={crypto} />
        ))}
      </ul>
    </>
  );
};

export default Cryptocurrencies;
