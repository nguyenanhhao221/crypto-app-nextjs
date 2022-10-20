import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer py-2 w-full mt-4 flex flex-col items-center bg-[#001529]">
      <h5 className="text-white text-center font-bold">
        Cryptoverse <br />
        All rights reserved.
      </h5>
      <div className="flex text-blue-500 gap-4">
        <Link href="/">Home</Link>
        <Link href="/exchanges">Exchanges</Link>
        <Link href="/news">News</Link>
      </div>
    </footer>
  );
};
