import { QuestionCircleOutlined } from '@ant-design/icons';
import { Progress, Spin, Table, Tooltip, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import millify from 'millify';
import { useGetExchangesQuery } from '../services/cryptoExchangeApi';
import { TBrands, TExchange } from '../type';
import BrandBackLink from './BrandBackLink';
import LineChart from './LineChart';
const Exchanges = () => {
  const {
    data: allExchanges,
    isFetching,
    isError,
    error,
  } = useGetExchangesQuery(undefined);
  if (isFetching && !allExchanges)
    return <Spin size="large" className="loader" />;
  if (isError) return <div>{`Error: ${error.toString()}`}</div>;

  const dataSource: TExchange[] | undefined = allExchanges?.map((exchange) => {
    return {
      ...exchange,
      trade_volume_24h_btc: millify(Number(exchange.trade_volume_24h_btc)),
      trade_volume_24h_btc_normalized: millify(
        Number(exchange.trade_volume_24h_btc_normalized)
      ),
    };
  });

  //INFO to be used for CoinGecko back link brand
  //* Change if use another brand API
  const coinGeckoLogo = require('../images/coingecko-logo.png');
  const coinGeckoInfo: TBrands = {
    logo: coinGeckoLogo,
    name: 'Coin Gecko',
    url: 'https://www.coingecko.com',
  };
  //TODO Work on display chart for 7 days price
  return (
    <>
      {/* //add rowKey so that each row of data will have unique key, if not React
      will complain */}
      <main>
        <section className="exchanges-headers">
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            Top Crypto Exchanges Ranked by Trust Score
          </Typography.Title>
          <BrandBackLink brand={coinGeckoInfo}></BrandBackLink>
        </section>
        <section className="table-exchanges">
          <Table dataSource={dataSource} rowKey={(record) => record.id}>
            <Column
              title="Rank"
              dataIndex="trust_score_rank"
              align="center"
              width={20}
              key="rank"
            ></Column>
            <Column
              title="Name"
              key="Name"
              render={(value, record: TExchange) => {
                return (
                  <div>
                    <a
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={record.url}
                    >
                      <img src={record.image} alt={`${record.name} Logo`} />
                      <Typography.Text style={{ marginLeft: '0.3rem' }}>
                        {record.name}
                      </Typography.Text>
                    </a>
                  </div>
                );
              }}
            ></Column>
            <Column
              title={
                <>
                  <Typography.Text>Trust Score</Typography.Text>{' '}
                  <Tooltip
                    title={
                      <p>
                        Trust Score is a rating algorithm developed by{' '}
                        <a
                          href="https://www.coingecko.com/en/exchanges"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="CoinGecko main website"
                        >
                          CoinGecko
                        </a>{' '}
                        to evaluate the legitimacy of an exchange’s trading
                        volume. Trust Score is calculated on a range of metrics
                        such as liquidity, scale of operations, cybersecurity
                        score, and more. For more details read CoinGecko{' '}
                        <a
                          href="https://www.coingecko.com/en/methodology"
                          target="_blank"
                          rel="noreferrer noopener"
                          title="CoinGecko methodology for Trust score website"
                        >
                          full methodology.
                        </a>
                      </p>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </>
              }
              key="trust_score"
              dataIndex="trust_score"
              render={(value) => (
                <div className="process-container">
                  <span>{value}</span>
                  <Progress
                    type="line"
                    size="small"
                    percent={value * 10}
                    strokeWidth={10}
                    showInfo={false}
                    style={{ marginLeft: '0.3rem' }}
                  ></Progress>
                </div>
              )}
              align="left"
            ></Column>
            <Column
              title="24h Trading Volume (Normalize)"
              dataIndex="trade_volume_24h_btc_normalized"
              key="trade_volume_24h_btc_normalized"
              render={(value) => `BTC ${value}`}
              align="right"
            ></Column>
            <Column
              title="24h Trading Volume"
              dataIndex="trade_volume_24h_btc"
              key="trade_volume_24h_btc"
              render={(value) => `BTC ${value}`}
              align="right"
            ></Column>
            <Column
              title="Last 7 days"
              dataIndex="volume_chart_7d"
              align="center"
              key="volume_chart_7d"
              width={70}
              //TODO: fix any type declare
              render={(value, record: any) => (
                <LineChart simplified coinHistory={value} />
              )}
            ></Column>
          </Table>
        </section>
      </main>
    </>
  );
};

export default Exchanges;
