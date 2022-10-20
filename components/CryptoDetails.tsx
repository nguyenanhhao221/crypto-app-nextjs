import {
  CheckOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Col, Row, Select, Spin, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import LineChart from './LineChart';

type Props = {};
type TStat = {
  title: string;
  icon?: string | JSX.Element;
  value?: number | string;
};

const { Title, Text } = Typography;
const { Option } = Select;
//TODO : Display 2 decimal for Current Price
const CryptoDetail = (props: Props) => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');

  const { data, isFetching: isFetchDetail } = useGetCryptoDetailQuery({
    coinId,
  });
  const { data: coinHistory, isFetching: isFetchHistory } =
    useGetCryptoHistoryQuery({ coinId, timePeriod });
  //TODO double check valid fetch load
  if (isFetchDetail || isFetchHistory)
    return <Spin size="large" className="loader" />;

  const cryptoDetail = data?.data?.coin; //Detail about the crypto return by API
  //the Time period to be selected
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
  //The main stat to be displayed
  const stats: TStat[] = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetail?.price && millify(cryptoDetail?.price)}`,
      icon: <DollarOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetail.rank,
      icon: <NumberOutlined />,
    },
    {
      title: '24h Volume',
      value: `${
        cryptoDetail['24hVolume'] && millify(cryptoDetail['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetail.marketCap && millify(cryptoDetail.marketCap)}`,
      icon: <DollarOutlined />,
    },
    {
      title: 'All Time Hight (Daily.AVG)',
      value: `$ ${
        cryptoDetail?.allTimeHigh?.price &&
        millify(cryptoDetail?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  //Other stats to be displayed
  const otherStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetail?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetail?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Approved Supply',
      value: cryptoDetail?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetail?.supply?.total && millify(cryptoDetail?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetail?.supply?.circulating &&
        millify(cryptoDetail?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetail.name} Price
        </Title>
        <p>
          {cryptoDetail.name} live price in US dollar. View value statistic,
          market cap and supply.
        </p>
      </Col>
      <Select
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimePeriod(value)}
        defaultValue={timePeriod}
      >
        {time.map((eachTimePeriod, index) => (
          <Option key={index} value={eachTimePeriod}>
            {eachTimePeriod}
          </Option>
        ))}
      </Select>
      {/* Line chart */}
      <LineChart
        coinName={cryptoDetail?.name}
        currentPrice={cryptoDetail?.price}
        coinHistory={coinHistory}
        simplified={false}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics" span={12}>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetail.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetail.name}</p>
          </Col>
          {stats.map(({ title, icon, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info" span={12}>
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>Other stats related to {cryptoDetail.name}</p>
          </Col>
          {otherStats.map(({ title, icon, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <div className="coin-details-heading">
            <Title level={2}>What is {cryptoDetail.name} ?</Title>
            {HTMLReactParser(cryptoDetail.description as string)}
          </div>
        </Row>
        <Col className="coin-links">
          <Title level={2} className="coin-details-heading">
            {cryptoDetail.name} Links
          </Title>
          {cryptoDetail.links.map(
            (link: { name: string; url: string; type: string }) => (
              <Row className="coin-link" key={link.url}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            )
          )}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetail;
