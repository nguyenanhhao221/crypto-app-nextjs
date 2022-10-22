import { useQuery } from '@tanstack/react-query';
import { getCryptoNewsClient } from '../services/cryptoNewsApi';
import { Loader } from './Loader';
import NewsCard from './NewsCard';

type Props = {
    simplified: boolean;
    newCategory: string;
    setNewCategory?: React.Dispatch<React.SetStateAction<string>>;
};

export const News = ({ simplified, newCategory }: Props) => {
    const numOfNews = simplified ? 6 : 12;

    //Fetch data for news
    const {
        data: cryptoNews,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery(['getNewsClient', numOfNews, newCategory], () =>
        getCryptoNewsClient(numOfNews, newCategory)
    );

    if (isLoading) return <Loader />;
    if (isError && error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }
    //Base on the result query render each new card
    if (isSuccess) {
        return (
            <>
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
            </>
        );
    }
    return <></>;
};
