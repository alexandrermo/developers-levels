import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
    <>
        <Head>
            <title>Teste Gazin</title>
            <meta name="description" content="Teste Gazin" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <main>
            <Typography variant="h3">
                Projeto <span>Teste</span>
            </Typography>
        </main>
    </>
);

export default Home;
