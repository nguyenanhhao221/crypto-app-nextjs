import React from 'react';
import { TExchange } from '../type';

type Props = {
  exchange: TExchange;
};

const ExchangeCard = ({ exchange }: Props) => {
  return <div>{exchange.name}</div>;
};

export default ExchangeCard;
