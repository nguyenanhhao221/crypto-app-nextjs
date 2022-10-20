import { Col, Row, Typography, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import millify from 'millify';
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js';

import { Line } from 'react-chartjs-2';
//TODO fix coinHistory type
type Props = {
  coinName?: string;
  currentPrice?: number;
  coinHistory: any;
  simplified: boolean;
};
type THistory = {
  price: string;
  timestamp: number;
};
//*Define type for Chart JS
interface TLineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}
//Check if price up or down in the coin history by comparing the first value price and the last, this will help to determine the chart line's color
const isPriceUp = (arrayOfPrice: number[]) => {
  return arrayOfPrice[0] - arrayOfPrice[arrayOfPrice.length - 1] >= 0
    ? false
    : true;
};
const { Title } = Typography;
Chart.register(...registerables); //register for ChartJS V3

const LineChart = ({
  coinName,
  currentPrice,
  coinHistory,
  simplified,
}: Props) => {
  const coinPrice: number[] = [];
  const coinTimeStamp: Array<string> = [];
  if (!simplified) {
    coinHistory?.data?.history?.forEach(({ price, timestamp }: THistory) => {
      //* We use unshift instead of push because later we need the correct order of these data so that the Chart can be draw correctly from left to right
      coinPrice.unshift(Number(price));
      coinTimeStamp.unshift(new Date(timestamp * 1000).toLocaleDateString());
    });
    const LineProps: TLineProps = {
      data: {
        labels: coinTimeStamp,
        datasets: [
          {
            label: `${coinName} Price in USD`,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
            fill: false,
            data: coinPrice,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        responsive: true,
      },
    };

    return (
      <>
        <Row className="chart-header">
          <Title level={2} className="chart-title">
            {coinName} Price Chart
          </Title>
          <Col>
            {coinHistory?.data?.change >= 0 ? (
              <Statistic
                value={coinHistory?.data?.change}
                prefix={<ArrowUpOutlined />}
                suffix="%"
                className="price-change"
                valueStyle={{ color: '#3f8600' }}
              ></Statistic>
            ) : (
              <Statistic
                value={coinHistory?.data?.change}
                prefix={<ArrowDownOutlined />}
                suffix="%"
                className="price-change"
                valueStyle={{ color: '#cf1322' }}
              ></Statistic>
            )}
            <Title level={5} className="current-price">
              Current {coinName} Price: $
              {typeof currentPrice !== 'undefined' && millify(currentPrice)}
            </Title>
          </Col>
        </Row>
        <Line data={LineProps.data} options={LineProps.options} />
      </>
    );
  }
  //This is for display chart in the Exchanges page, because we use 2 different APIs so the data return with 2 different format so we will have different logic to render the chart
  coinHistory.forEach((history: [number, string]) => {
    const [timestamp, price] = history;
    coinPrice.push(Number(price));
    coinTimeStamp.push(new Date(timestamp).toLocaleDateString());
  });

  const LineProps: TLineProps = {
    data: {
      labels: coinTimeStamp,
      datasets: [
        {
          borderColor: isPriceUp(coinPrice)
            ? 'rgb(29, 209, 90)'
            : 'rgb(239, 89, 89)',
          fill: false,
          data: coinPrice,
        },
      ],
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      elements: {
        point: {
          radius: 0, //disable the point in chart
        },
      },

      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      aspectRatio: 3,
      plugins: {
        legend: { display: false }, //Hide the label in the chart
        title: { display: false },
      },
    },
  };

  return <Line data={LineProps.data} options={LineProps.options} />;
};

export default LineChart;
