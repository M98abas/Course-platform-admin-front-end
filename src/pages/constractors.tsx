import { mdiGithub, mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/constractor'
import { getPageTitle } from '../config'

const TablesPage = () => {
  const columns: Array<string> = [
    'Image',
    'nickName',
    'email',
    'levelOfExperience',
    'refererCode',
    'created_at',
    'actions',
  ]

  return (
    <>
      <Head>
        <title>{getPageTitle('Constractor')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Constractor" main>
          <Button label="constractors" color="contrast" roundedFull small />
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
