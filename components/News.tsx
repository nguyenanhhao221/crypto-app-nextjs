import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCryptoNews } from '../services/cryptoNewsApi';
import { TNewValue } from '../type';
import { Loader } from './Loader';
import NewsCard from './NewsCard';

type Props = {
    simplified: boolean;
};

const News = ({ simplified }: Props) => {
    const [newCategory, setNewCategory] = useState('Cryptocurrencies');
    const numOfNews = simplified ? 6 : 12;

    const {
        data: cryptoNews,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery(['getNews', numOfNews, newCategory], () =>
        getCryptoNews(numOfNews, newCategory)
    );
    if (isLoading) return <Loader />;
    if (isError && error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }
    //Base on the result query render each new card
    if (isSuccess) {
        return (
            <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {cryptoNews.value.map((newData) => (
                    <li
                        key={newData.url}
                        className="cursor-pointer shadow-xl transition-colors md:hover:bg-slate-200"
                    >
                        <NewsCard newData={newData} />
                    </li>
                ))}
            </ul>
        );
    }
    return <>Something wrong</>;
};

export default News;
