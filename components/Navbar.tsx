import React from 'react';
import Link from 'next/link';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import icon from '../public/cryptocurrency.png';
import Image from 'next/future/image';
type Props = {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
};
//new meneItems to display children for antd design
const menuItems = [
  {
    label: (
      <Link className="cursor-pointer group-hover:text-sky-800" href="/">
        Home
      </Link>
    ),
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link
        className="cursor-pointer group-hover:text-sky-800"
        href="/cryptocurrencies"
      >
        Cryptocurrencies
      </Link>
    ),
    key: 'Cryptocurrencies',
    icon: <FundOutlined />,
  },
  {
    label: (
      <Link
        className="cursor-pointer group-hover:text-sky-800"
        href="/exchanges"
      >
        Exchanges
      </Link>
    ),
    key: 'exchanges',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: (
      <Link className="cursor-pointer group-hover:text-sky-800" href="/news">
        News
      </Link>
    ),
    key: 'news',
    icon: <BulbOutlined />,
  },
];
const Navbar = ({ collapse, setCollapse }: Props) => {
  return (
    <nav className="bg-[#001529] md:static flex flex-col items-center justify-between z-10 fixed top-0 bottom-0 left-0 overflow-hidden min-w-fit">
      <div className="flex flex-col md:items-start md:gap-6 items-center px-2">
        <div className="logo-container flex justify-between gap-2 items-center">
          <Image
            src={icon}
            alt="logo"
            className="w-16 h-auto object-contain object-center"
          />
          <h2
            className={`Logo hidden md:block text-[#1890ff] font-extrabold text-3xl ${
              collapse ? `md:hidden` : ``
            }`}
          >
            <Link href="/">Cryptoverse</Link>
          </h2>
        </div>
        <ul className={`${collapse && `self-center`}`}>
          {menuItems.map((item) => (
            <li
              className="flex cursor-pointer hover:text-gray-500 group items-center gap-4 p-2 text-gray-300"
              key={item.key}
            >
              {item.icon}
              {!collapse && item.label}
            </li>
          ))}
        </ul>
      </div>
      <button
        title="slider"
        type="button"
        className="text-gray-300 bg-[#002140] w-full"
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <LeftOutlined /> : <RightOutlined />}
      </button>
    </nav>
  );
};

export default Navbar;
