import { ArrowRightOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Spin, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
type Props = {
  newsUrl: string;
  newsName: string;
  newsImg?: string;
  newsDescription: string;
  providerName?: string;
  providerImg?: string;
  datePublished: string;
  isFetching: boolean;
};
const { Meta } = Card;
const { Title, Paragraph } = Typography;
const NewsCard = ({
  newsUrl,
  newsName,
  newsImg,
  newsDescription,
  providerName,
  providerImg,
  datePublished,
  isFetching,
}: Props) => {
  const emptyImage = require('../public/emptyImg.png');
  return (
    <a href={newsUrl} target="_blank" rel="noreferrer">
      <Card
        className="news-card"
        loading={isFetching}
        cover={
          isFetching ? (
            <Spin
              size="small"
              style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ) : (
            <img
              alt="Cover"
              src={newsImg ? newsImg : emptyImage}
              height={200}
            />
          )
        }
        hoverable
        style={{
          overflow: 'hidden',
          minHeight: '550px',
          display: 'flex',
          flexDirection: 'column',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '350px',
        }}
      >
        <Title
          level={4}
          style={{
            flexBasis: '35%',
          }}
          className="news-card-title"
        >
          {newsName}
        </Title>
        <Divider />
        <Paragraph
          ellipsis={{ rows: 3, suffix: '...' }}
          className="news-card-description"
        >
          {newsDescription}
        </Paragraph>
        <div className="news-meta-container">
          <Meta
            title={providerName}
            className="news-meta"
            description={moment(datePublished).startOf('seconds').fromNow()}
            avatar={
              <Avatar
                src={providerImg ? providerImg : emptyImage}
                alt={providerName}
              ></Avatar>
            }
          />
          <Tooltip title="Read more">
            <Button type="primary">
              Read more <ArrowRightOutlined />
            </Button>
          </Tooltip>
        </div>
      </Card>
    </a>
  );
};

export default NewsCard;
