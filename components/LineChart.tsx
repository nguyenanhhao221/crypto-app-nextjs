import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TResponseCoinHistory } from '../type';
import { useQuery } from '@tanstack/react-query';
import { getCoinHistoryClient } from '../services/cryptoApi';
import { useRouter } from 'next/router';
import { isPriceUp } from './Utils';
import { Loader } from './Loader';
import { UpDownValue } from './UpDownValue';

type Props = {
    coinName: string;
    coinHistory?: TResponseCoinHistory['data'];
    simplified: boolean;
    mobileView: boolean;
    timePeriod: string;
};

//*Define type for Chart JS
interface TLineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

//register for ChartJS V3
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ coinName, simplified, timePeriod }: Props) => {
    const coinPrice: number[] = [];
    const coinTimeStamp: Array<string> = [];
    const coinId = useRouter().query.coinId;
    const { data, isLoading, isError, error } = useQuery(
        ['getCoinHistory', timePeriod],
        () => getCoinHistoryClient(timePeriod, coinId)
    );
    if (isLoading) return <Loader></Loader>;
    if (isError && error instanceof Error) return <div>{error.message}</div>;

    const coinHistory = data?.data.history;
    if (!simplified && coinHistory) {
        coinHistory?.forEach(({ price, timestamp }) => {
            //* We use unshift instead of push because later we need the correct order of these data so that the Chart can be draw correctly from left to right
            coinPrice.unshift(Number(price));
            coinTimeStamp.unshift(
                new Date(timestamp * 1000).toLocaleDateString()
            );
        });

        const LineProps: TLineProps = {
            data: {
                labels: coinTimeStamp,
                datasets: [
                    {
                        label: `${coinName} Price in USD`,
                        backgroundColor: isPriceUp(coinPrice)
                            ? '#4ade80'
                            : '#f87171',
                        borderColor: isPriceUp(coinPrice)
                            ? '#4ade80'
                            : '#f87171',
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
                maintainAspectRatio: false,
            },
        };

        return (
            <div className="">
                <UpDownValue value={data.data.change} suffix="%" />

                <div className="chart-wrapper mx-auto h-[400px] w-[90%]">
                    <Line data={LineProps.data} options={LineProps.options} />
                </div>
            </div>
        );
    }
    //This is for display chart in the Exchanges page, because we use 2 different APIs so the data return with 2 different format so we will have different logic to render the chart
    // coinHistory.forEach((history: [number, string]) => {
    //     const [timestamp, price] = history;
    //     coinPrice.push(Number(price));
    //     coinTimeStamp.push(new Date(timestamp).toLocaleDateString());
    // });

    // const LineProps: TLineProps = {
    //     data: {
    //         labels: coinTimeStamp,
    //         datasets: [
    //             {
    //                 borderColor: isPriceUp(coinPrice)
    //                     ? 'rgb(29, 209, 90)'
    //                     : 'rgb(239, 89, 89)',
    //                 fill: false,
    //                 data: coinPrice,
    //             },
    //         ],
    //     },
    //     options: {
    //         indexAxis: 'x',
    //         responsive: true,
    //         elements: {
    //             point: {
    //                 radius: 0, //disable the point in chart
    //             },
    //         },

    //         scales: {
    //             x: {
    //                 display: false,
    //             },
    //             y: {
    //                 display: false,
    //             },
    //         },
    //         aspectRatio: 3,
    //         plugins: {
    //             legend: { display: false }, //Hide the label in the chart
    //             title: { display: false },
    //         },
    //     },
    // };

    // return <Line data={LineProps.data} options={LineProps.options} />;
    return <></>;
};

export default LineChart;
