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
            <Link
                className="cursor-pointer group-hover:text-sky-800"
                href="/news"
            >
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
                } fixed top-0 bottom-0 left-0 z-10 flex min-w-fit flex-col items-center justify-between overflow-hidden bg-[#001529]`}
            >
                <div className="flex flex-col items-center md:items-start md:gap-6">
                    <div className="logo-container flex cursor-pointer items-center justify-between gap-2 p-2">
                        <Link passHref href="/">
                            <a>
                                <Image
                                    src={icon}
                                    alt="logo"
                                    className="h-auto w-12 object-contain object-center md:w-16"
                                />
                            </a>
                        </Link>
                    </div>
                    <ul className="flex w-full flex-col items-center self-center">
                        {menuItems.map((item) => (
                            <li
                                className={`group flex w-full cursor-pointer items-center justify-center gap-4 p-2 text-slate-300 hover:text-gray-100 ${
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
                    className="w-full bg-[#002140] text-slate-300"
                    onClick={() => setCollapse(!collapse)}
                >
                    {collapse ? <RightOutlined /> : <LeftOutlined />}
                </button>
            </nav>

            <nav
                className={`-translate-x-full bg-[#001529] opacity-0 duration-300 ease-in-out ${
                    !collapse && `translate-x-0 opacity-100`
                } fixed top-0 bottom-0 left-0 z-10 flex min-w-fit flex-col items-center justify-between overflow-hidden`}
            >
                <div className="flex flex-col items-center md:items-start md:gap-6">
                    <div className="logo-container flex items-center justify-between gap-2 px-2">
                        <Image
                            src={icon}
                            alt="logo"
                            className="h-auto w-12 object-contain object-center md:w-16"
                        />
                        <h2
                            className={`Logo text-3xl font-extrabold text-[#1890ff]`}
                        >
                            <Link href="/">Cryptoverse</Link>
                        </h2>
                    </div>
                    <ul className="w-full py-4">
                        {menuItems.map((item) => (
                            <li
                                className={`group flex cursor-pointer items-center gap-4 p-2 text-slate-300 transition-colors hover:text-gray-100 ${
                                    item.key === pathname
                                        ? `bg-[#1990ff] text-white`
                                        : ``
                                }`}
                                key={item.key}
                            >
                                {item.icon}
                                <p className="group-hover:text-blue-600">
                                    {item.label}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    title="slider"
                    type="button"
                    className="w-full bg-[#002140] text-slate-300"
                    onClick={() => setCollapse(!collapse)}
                >
                    {collapse ? <RightOutlined /> : <LeftOutlined />}
                </button>
            </nav>
        </>
    );
};

export default Navbar;
