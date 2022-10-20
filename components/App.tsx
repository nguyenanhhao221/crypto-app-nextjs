import { Layout, Space, Typography } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { Footer } from './Footer';
import Homepage from './Homepage';
import Navbar from './Navbar';

//TODO: Make error page for invalid route
export const App = () => {
  return (
    <>
      <Homepage />
    </>
  );
};
