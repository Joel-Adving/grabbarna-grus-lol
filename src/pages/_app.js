import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Grabbarna Grus</title>
                <meta name="description" content="Grabbarna Grus Lol" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
