import { Select, Row, Col, Spin } from 'antd';
import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { TCrypto } from '../components/Cryptocurrencies';
import NewsCard from './NewsCard';
const { Option } = Select;

type Props = {
  simplified: boolean;
};

//Define the type for News return from API to use in Map method. If any changes for property by the APIs the Type needs to be update correctly
type TNewsImage = {
  image?: {
    thumbnail: {
      contentUrl: string;
    };
    contentUrl: string;
  };
  name?: string;
};
interface TNews extends TNewsImage {
  value: string;
  name: string;
  url: string;
  description: string;
  datePublished: string;
  provider: TNewsImage[];
}

const News = ({ simplified }: Props) => {
  const [newCategory, setNewCategory] = useState('Cryptocurrencies');
  //Call the cryptoNewsApi
  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery({
    newCategory: newCategory,
    count: simplified ? 6 : 12, //if in simplified mode display 6 news article only
  });

  //Call the crypto api
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Spin size='large' className='loader' />;
  //Base on the News return from the API render out the articles
  return (
    <Row gutter={[24, 24]}>
      {/* Display search box to filter topic */}
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            allowClear
            placeholder='Search Crypto Topics'
            onChange={(value) => setNewCategory(value)}
            optionFilterProp='children' //which props of the Option to be used when filter, the children props is equal to the string between the <Option> </Option>
            //filterOption take a function with 2 parameter. input is the input user type in search box, option represent the Option tag
            //When user type in the search box, it will run a filter function and filter out the matched result
            filterOption={(input, option) => {
              return (
                (option!.children as unknown as string) // "!" meaning is a trick that we only use when we know that variable for sure not undefined or null, here option maybe undefined but we tell TS that we know it will not
                  //when access the children property of option we also use "as unknown" "as string" this mean that we tell TS to reset the type of option.children and reassign that to string, because the default type of option.children is set as Omit<DefaultOptionType, "children">[] | undefined
                  .toLowerCase()
                  .includes(input.toLowerCase())
              );
            }}
          >
            <Option value='Cryptocurrencies'>Cryptocurrencies</Option>
            {data?.data?.coins.map((coin: TCrypto, index: number) => (
              <Option value={coin.name} key={index}>
                {/* This is the children props of each option */}
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {/* Display article about crypto */}
      {cryptoNews?.value.map((news: TNews, i: number) => (
        <Col key={i} xs={24} lg={24 / 2} xxl={24 / 3}>
          <NewsCard
            newsUrl={news.url}
            newsName={news.name}
            newsImg={news?.image?.contentUrl}
            newsDescription={news.description}
            providerName={news.provider[0].name}
            providerImg={news.provider[0]?.image?.thumbnail?.contentUrl}
            datePublished={news.datePublished}
            isFetching={isFetching}
          />
        </Col>
      ))}
    </Row>
  );
};

export default News;
