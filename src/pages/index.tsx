import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiClockCheckOutline,
} from '@mdi/js'
import Head from 'next/head'
import React from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useSampleClients } from '../hooks/sampleData'
import { Client } from '../interfaces'
import CardBoxClient from '../components/CardBox/Client'
import { getPageTitle } from '../config'

const Dashboard: any = () => {
  const { clients } = useSampleClients('constractor')
  const data = useSampleClients('contract')
  const enrollment = useSampleClients('enrolled')
  const visitors = useSampleClients('visit')
  //console.log(enrollment);

  // const dispatch = useAppDispatch()

  const clientsListed = clients.slice(0, 8)

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{getPageTitle('Xenon - Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
          <p>.</p>
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <CardBoxWidget
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={clients.length}
            label="Clients"
          />
          <CardBoxWidget
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={enrollment.clients.length}
            label="Sales"
          />
          <CardBoxWidget
            trendType="down"
            trendColor="danger"
            icon={mdiClockCheckOutline}
            iconColor="info"
            number={visitors.clients}
            label="Visitors"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12 lg:grid-cols-2">
          {clientsListed.map((client: Client) => (
            <CardBoxClient key={client.id} client={client} />
          ))}
        </div>
      </SectionMain>
    </>
  )
}
// <<<<<<< HEAD
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}
export default Dashboard
