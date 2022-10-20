import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  const [collapse, setCollapse] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className="app-wrapper min-h-screen flex gap-4">
          <Navbar collapse={collapse} setCollapse={setCollapse} />
          <div className={`flex flex-col w-screen ml-20 md:static md:ml-0`}>
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
