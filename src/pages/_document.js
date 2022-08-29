import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Friz-Quadrata-Regular.woff2"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
        />
        <link rel="preload" href="/fonts/BeaufortBold.woff2" as="font" crossOrigin="anonymous" type="font/woff2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
