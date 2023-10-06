import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import '../css/main.css'
import Cookies from 'js-cookie'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    getAndSet()
  }, [])

  const getAndSet = async () => {
    const token = await Cookies.get('token')
    if (!token && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }

    if (token && window.location.pathname == '/login') window.location.href = '/'
  }

  const title = `Admin One React Tailwind free`

  const description = 'This is the administration page'

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name="description" content={description} />
            <meta property="og:site_name" content="Admin.me" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <link rel='icon' href='/favicon.ico' />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
          </Head>
{/*  */}
          <Component {...pageProps} />
        </>
      )}
    </Provider>
  )
}

export default MyApp
