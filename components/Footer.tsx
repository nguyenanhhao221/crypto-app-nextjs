import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer mt-4 flex w-full flex-col items-center bg-[#001529] py-2">
            <h5 className="text-center font-bold text-white">
                Cryptoverse <br />
                All rights reserved.
            </h5>
            <div className="flex gap-4 text-blue-500">
                <Link href="/">Home</Link>
                <Link href="/exchanges">Exchanges</Link>
                <Link href="/news">News</Link>
            </div>
        </footer>
    );
};
