import Head from 'next/head'
import React from 'react'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import ProtectedRoute from '../util/ProtectedRoute'

const authRequired = ['/add-grabb']

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    return (
        <AuthContextProvider>
            <Head>
                <title>Grabbarna Grus</title>
                <meta name="description" content="Grabbarna Grus Lol" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {!authRequired.includes(router.pathname) ? (
                <>
                    <Component {...pageProps} />
                </>
            ) : (
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            )}
        </AuthContextProvider>
    )
}

export default MyApp
