import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

const Home: NextPage = () => {
    useEffect(() => {
        (async () => {
            await fetch('api/hello');
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Teste Gazin</title>
                <meta name="description" content="Teste Gazin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Typography variant="h3">
                    Projeto <span>Teste</span>
                </Typography>
            </main>
        </>
    );
};

export default Home;
