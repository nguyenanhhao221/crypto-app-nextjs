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
import { motion } from 'framer-motion';
function MyApp({
    Component,
    pageProps,
    router,
}: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient] = useState(() => new QueryClient());
    const [collapse, setCollapse] = useState(true);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <div className="app-wrapper flex min-h-screen gap-4">
                    <Navbar collapse={collapse} setCollapse={setCollapse} />
                    <div
                        className={`ml-16 flex w-screen flex-col md:static ${
                            collapse ? `md:ml-20` : `md:ml-[300px]`
                        } `}
                    >
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={{
                                initial: {
                                    opacity: 0,
                                },
                                animate: {
                                    opacity: 1,
                                },
                            }}
                            key={router.route}
                        >
                            <Component {...pageProps} />
                        </motion.div>
                        <Footer />
                    </div>
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
