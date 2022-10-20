import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    key: '/',
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
    key: '/cryptocurrencies',
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
    key: '/exchanges',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: (
      <Link className="cursor-pointer group-hover:text-sky-800" href="/news">
        News
      </Link>
    ),
    key: '/news',
    icon: <BulbOutlined />,
  },
];
const Navbar = ({ collapse, setCollapse }: Props) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <nav
        className={` ${
          !collapse && `hidden`
        } bg-[#001529] fixed flex flex-col items-center justify-between z-10 top-0 bottom-0 left-0 overflow-hidden min-w-fit`}
      >
        <div className="flex flex-col md:items-start md:gap-6 items-center">
          <div className="logo-container cursor-pointer flex justify-between gap-2 items-center px-2">
            <Link href="/">
              <Image
                src={icon}
                alt="logo"
                className="w-16 h-auto object-contain object-center"
              />
            </Link>
          </div>
          <ul className="self-center w-full flex flex-col items-center">
            {menuItems.map((item) => (
              <li
                className={`w-full flex cursor-pointer hover:text-gray-100 group justify-center items-center gap-4 p-2 text-slate-300 ${
                  item.key === pathname ? `bg-[#1990ff]` : ``
                }`}
                key={item.key}
              >
                <Link href={item.key}>{item.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          title="slider"
          type="button"
          className="text-slate-300 bg-[#002140] w-full"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? <RightOutlined /> : <LeftOutlined />}
        </button>
      </nav>

      <nav
        className={`bg-[#001529] -translate-x-full opacity-0 ease-in-out duration-300 ${
          !collapse && `translate-x-0 opacity-100`
        } fixed flex flex-col items-center justify-between z-10 top-0 bottom-0 left-0 overflow-hidden min-w-fit`}
      >
        <div className="flex flex-col md:items-start md:gap-6 items-center">
          <div className="logo-container flex justify-between gap-2 items-center px-2">
            <Image
              src={icon}
              alt="logo"
              className="w-16 h-auto object-contain object-center"
            />
            <h2 className={`Logo text-[#1890ff] font-extrabold text-3xl`}>
              <Link href="/">Cryptoverse</Link>
            </h2>
          </div>
          <ul className="w-full py-4">
            {menuItems.map((item) => (
              <li
                className={`flex cursor-pointer transition-colors hover:text-gray-100 group items-center gap-4 p-2 text-slate-300 ${
                  item.key === pathname ? `bg-[#1990ff] text-white` : ``
                }`}
                key={item.key}
              >
                {item.icon}
                <p className="group-hover:text-blue-600">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          title="slider"
          type="button"
          className="text-slate-300 bg-[#002140] w-full"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? <RightOutlined /> : <LeftOutlined />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
