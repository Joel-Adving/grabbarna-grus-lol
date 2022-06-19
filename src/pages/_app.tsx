import Head from 'next/head'
import Header from '../components/Header'
import ProtectedRoute from '../util/ProtectedRoute'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../context/AuthContext'
import { RecoilRoot } from 'recoil'
import { authRequired } from '../util/config'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    return (
        <AuthContextProvider>
            <Head>
                <title>Grabbarna Grus</title>
                <meta name="description" content="Grabbarna Grus Lol" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/fonts/Friz-Quadrata-Regular.woff2"
                    as="font"
                    crossOrigin=""
                    type="font/woff2"
                />
                <link
                    rel="preload"
                    href="https://db.onlinewebfonts.com/t/fe90d2b331edb90ed36369d0c270d5b6.woff2"
                    as="font"
                    crossOrigin=""
                    type="font/woff2"
                />
            </Head>
            <RecoilRoot>
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
            </RecoilRoot>
        </AuthContextProvider>
    )
}

export default MyApp
