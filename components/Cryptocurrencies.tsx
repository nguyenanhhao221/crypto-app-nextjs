import { useState } from 'react';
import { CryptoCard } from './CryptoCard';
import { useQuery } from '@tanstack/react-query';
import { getCoinRanking } from '../services/cryptoApi';
import { Spin } from 'antd';

type Props = { simplified: boolean };

const Cryptocurrencies = ({ simplified }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const { data, isLoading, isError, error } = useQuery(['getCoins'], () =>
    getCoinRanking(count)
  );
  const [searchTerm, setSearchTerm] = useState('');
  if (isLoading) return <Spin />;
  if (isError) return <>{error}</>;
  const cryptosToRender = data.data.coins.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <main>
      <div className="py-4">
        {/* Add search box only when not in simplified  */}
        {!simplified && (
          <div className="w-full text-center">
            <input
              placeholder="Search Crypto"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 md:w-60"
            />
          </div>
        )}
        <ul className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-8 gap-4">
          {cryptosToRender.map((crypto) => (
            <CryptoCard key={crypto.name} crypto={crypto} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Cryptocurrencies;
