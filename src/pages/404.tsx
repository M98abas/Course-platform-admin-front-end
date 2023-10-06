import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { getPageTitle } from '../config'
import Buttons from '../components/Buttons'

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Error')}</title>
      </Head>

      <SectionFullScreen bg="pinkRed">
        <CardBox
          className="w-11/12 shadow-2xl md:w-7/12 lg:w-6/12 xl:w-4/12"
          footer={<Button href="/" label="Go home" color="danger" />}
        >
          <div className="space-y-3">
            <h1 className="text-2xl">404 Error page not found</h1>

            <p>An Error Occurred</p>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default ErrorPage
