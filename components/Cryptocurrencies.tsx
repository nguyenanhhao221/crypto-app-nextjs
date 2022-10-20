import { useState } from 'react';
import { CryptoCard } from './CryptoCard';
import { TCrypto, TResponseGetCoin } from '../type';
import { useQuery } from '@tanstack/react-query';
import { getCoinRanking } from '../services/cryptoApi';
import { Input, Spin } from 'antd';

type Props = { simplified: boolean; cryptos: TCrypto[] };

const Cryptocurrencies = ({ simplified, cryptos }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const [searchTerm, setSearchTerm] = useState('');
  const cryptosToRender = cryptos.slice(0, count);
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
      <ul className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-8 gap-4">
        {cryptosToRender.map((crypto) => (
          <CryptoCard key={crypto.name} crypto={crypto} />
        ))}
      </ul>
    </>
  );
};

export default Cryptocurrencies;
