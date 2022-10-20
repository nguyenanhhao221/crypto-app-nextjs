import { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Spin, Avatar, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Link from 'next/link';
import millify from 'millify';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

type Props = { simplified: boolean };
type T = {
  [key: string]: number | string;
  price: number;
  marketCap: number;
  change: number;
};

export interface TCrypto extends T {
  name: string;
}

const Cryptocurrencies = ({ simplified }: Props) => {
  //If simplified is true then display only top 10 currencies, if not display 100
  const count = simplified ? 10 : 100;
  const {
    data: cryptoList,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<T[]>(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  //TODO implement redux to avoid useEffect complication
  useEffect(() => {
    if (!cryptoList) return;
    const filterData: T[] = cryptoList?.data?.coins.filter((coin: TCrypto) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterData);
  }, [searchTerm, cryptoList]);

  if (isFetching && isLoading) return <Spin size="large" className="loader" />;
  // After finish fetching and loading, the component state (cryptos) might not been set correctly so we add the below statement to make sure the internal state get set properly with the data return from API

  if (!cryptos && isSuccess) {
    setCryptos(cryptoList.data.coins);
  }

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

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={24 / 2}
            lg={24 / 3}
            xl={24 / 4}
            xxl={24 / 6}
            key={currency.uuid}
            className="crypto-card"
          >
            <Link href={`/crypto/${currency.uuid}`}>
              <Card
                hoverable
                title={`${currency.rank} . ${currency.name}`}
                extra={
                  <Avatar
                    src={`${currency.iconUrl}`}
                    alt={`${currency.name} icon`}
                  />
                }
              >
                <Statistic
                  value={millify(currency.price)}
                  title="Price"
                  prefix="$"
                ></Statistic>
                <Statistic
                  value={millify(currency.marketCap)}
                  title="Market Cap"
                  prefix="$"
                ></Statistic>
                {currency?.change >= 0 ? (
                  <Statistic
                    value={currency.change}
                    prefix={<CaretUpOutlined />}
                    suffix={'%'}
                    title="Daily Change"
                    valueStyle={{ color: '#1dd15a', display: 'inline' }}
                  ></Statistic>
                ) : (
                  <Statistic
                    value={currency.change * -1}
                    prefix={<CaretDownOutlined />}
                    suffix={'%'}
                    title="Daily Change"
                    valueStyle={{ color: '#ef5959', display: 'inline' }}
                  ></Statistic>
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
