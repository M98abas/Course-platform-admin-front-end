import { mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/enrollment'
import { getPageTitle } from '../config'

const TablesPage = () => {
  const columns: Array<string> = [
    'titleAr',
    'nickName',
    'email',
    'status',
    'finished',
    'repeated',
    'created at',
    'actions',
  ]

  return (
    <>
      <Head>
        <title>{getPageTitle('Enrollment')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Enrollment" main>
          <p>Enrolled Users</p>
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableSampleClients columns={columns} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
