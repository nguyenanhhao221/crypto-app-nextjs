import React from 'react';
import moment from 'moment';

import emptyImage from '../public/emptyImg.png';
import Link from 'next/link';
import { TNewValue } from '../type';
import Image from 'next/future/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
type Props = {
    newData: TNewValue;
};

//* Due to the response from RapidAPI with Bing Search News.
//* In order to get the full image we have to combine the url and w and h to combine the full image
const NewsCard = ({ newData }: Props) => {
    const { image, url, name, description, provider, datePublished } = newData;
    const newsImgSrc = image
        ? `${image.thumbnail.contentUrl}&w=${image.thumbnail.width}&h=${image.thumbnail.height} `
        : emptyImage;
    const providerImgSrc = provider[0].image
        ? `${provider[0].image.thumbnail.contentUrl}`
        : emptyImage;
    return (
        <>
            <Link href={url} passHref>
                <a target="_blank" rel="noopener noreferrer">
                    <div className="gap-2">
                        <Image
                            alt="News"
                            src={newsImgSrc}
                            width="600"
                            height="500"
                            className="w-full overflow-hidden object-fill object-center md:h-80"
                        />
                        <div className="overflow-hidden p-2 md:h-60 md:max-h-60">
                            <h3 className="font-bold md:text-lg">{name}</h3>
                            <p className="text-sm line-clamp-3 md:text-base xl:line-clamp-4">
                                {description}
                            </p>
                        </div>
                        <div className="flex justify-center py-2">
                            <Link passHref href={url}>
                                <a
                                    className="inline-flex items-center gap-1 rounded-sm bg-blue-500 p-2 text-center text-white"
                                    title="Link to article"
                                >
                                    Read more
                                    <ArrowRightIcon className="h-4 w-4" />
                                </a>
                            </Link>
                        </div>
                        <div className="flex w-full flex-grow items-center justify-between p-2">
                            <Image
                                alt="news provider"
                                width={30}
                                height={30}
                                src={providerImgSrc}
                                className="h-12 w-12 rounded-full object-contain object-center md:h-16 md:w-16"
                            />
                            <div className="">
                                <p className="text-sm font-semibold md:text-base">
                                    {newData.provider[0].name}
                                </p>
                                <p className="text-xs text-slate-400 md:text-sm">
                                    {moment(datePublished)
                                        .startOf('seconds')
                                        .fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </>
        // <a href={newsUrl} target="_blank" rel="noreferrer">
        //     <Card
        //         className="news-card"
        //         loading={isFetching}
        //         cover={
        //             isFetching ? (
        //                 <Spin
        //                     size="small"
        //                     style={{
        //                         height: '200px',
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                     }}
        //                 />
        //             ) : (
        //                 <img
        //                     alt="Cover"
        //                     src={newsImg ? newsImg : emptyImage}
        //                     height={200}
        //                 />
        //             )
        //         }
        //         hoverable
        //         style={{
        //             overflow: 'hidden',
        //             minHeight: '550px',
        //             display: 'flex',
        //             flexDirection: 'column',
        //         }}
        //         bodyStyle={{
        //             display: 'flex',
        //             flexDirection: 'column',
        //             justifyContent: 'space-between',
        //             minHeight: '350px',
        //         }}
        //     >
        //         <Title
        //             level={4}
        //             style={{
        //                 flexBasis: '35%',
        //             }}
        //             className="news-card-title"
        //         >
        //             {newsName}
        //         </Title>
        //         <Divider />
        //         <Paragraph
        //             ellipsis={{ rows: 3, suffix: '...' }}
        //             className="news-card-description"
        //         >
        //             {newsDescription}
        //         </Paragraph>
        //         <div className="news-meta-container">
        //             <Meta
        //                 title={providerName}
        //                 className="news-meta"
        //                 description={moment(datePublished)
        //                     .startOf('seconds')
        //                     .fromNow()}
        //                 avatar={
        //                     <Avatar
        //                         src={providerImg ? providerImg : emptyImage}
        //                         alt={providerName}
        //                     ></Avatar>
        //                 }
        //             />
        //             <Tooltip title="Read more">
        //                 <Button type="primary">
        //                     Read more <ArrowRightOutlined />
        //                 </Button>
        //             </Tooltip>
        //         </div>
        //     </Card>
        // </a>
    );
};

export default NewsCard;
