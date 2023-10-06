import {
  mdiAccountReactivate,
  mdiCheckDecagram,
  mdiEye,
  mdiTrashCan,
} from '@mdi/js'

import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import { Notification } from '../../interfaces'
import { ApiDeleteData } from '../../api/api'
import {  useRouter } from 'next/router'
import CardBoxModal from '../../components/CardBox/Modal'


const TableSampleClients = ({ columns }) => {
  const router = useRouter()

  const { clients } = useSampleClients(`notification/dm`)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const [ind, setInd] = useState(0)
  const [id, setid] = useState(0)


  const perPage = 12

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages:any = parseInt((clients.length / perPage).toString())
console.log(clients);
  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }


const handelDeleteAction = async () => {
//    setLoading(true)
    await ApiDeleteData('notification', id, (data) => {
//console.log(data)
if (data.errMsg != '') return(<p>Error</p>)
//setLoading(false)
router.reload()
//      setLoading(false)
    })

    setIsModalTrashActive(false)
  }

  const handleCancelAction = () => {
    setIsModalTrashActive(false)
  }

  return (
    <>
      {!clients ? (
        <div className="text-center h-[60vh] flex items-center justify-center z-999">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-40 h-40 mr-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>

	   <CardBoxModal
            title="Please confirm"
            buttonColor="danger"
            buttonLabel="Confirm"
            isActive={isModalTrashActive}
            onConfirm={handelDeleteAction}
            onCancel={() => handleCancelAction()}
          >
            <p>
              Are you sure you want to delete <b>{clients[ind]?.email}</b>??
            </p>
          </CardBoxModal>
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client: Notification, index: number) => (
                <tr key={client.id}>
                  <td data-label="nickName">{client.title}</td>
                  <td data-label="Name">{client.message}</td>
                  <td data-label="Name">{client.target}</td>
                  <td data-label="Name">{client.sendDate}</td>
                  <td data-label="PhoneNumber">{client.status}</td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{client.created_at}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">

                      {client.active ? (

                        <>
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => {
                              setInd(index)
                              setid(client.id)
                              setIsModalTrashActive(true)
                            }}
                            small
                          />
                        </>):''}
</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
            <div className="flex flex-col items-center justify-between py-3 md:flex-row md:py-0">
              <Buttons>
                {pagesList.map((page) => (
                  <Button
                    key={page}
                    active={page === currentPage}
                    label={page + 1}
                    color={page === currentPage ? 'lightDark' : 'whiteDark'}
                    small
                    onClick={() => setCurrentPage(page)}
                  />
                ))}
              </Buttons>
              <small className="mt-6 md:mt-0">
                Page {currentPage + 1} of {numPages}
              </small>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TableSampleClients
