import {
  mdiAccountReactivate,
  mdiAlertDecagramOutline,
  mdiCheckDecagram,
  mdiEye,
  mdiTrashCan,
} from '@mdi/js'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import { ApiDeleteData, ApiGetCategory, ApiUpdateData } from '../../api/api'
import Image from 'next/image'
import { Client } from '../../interfaces'
//import { useRouter } from 'next/router'
import deleteFile from '../uplaodingFolder/video'
import Icon from '../Icon'
import { useRouter } from 'next/router'

const TableSampleClients = ({ columns }) => {
  const router: any = useRouter()
  const { id } = router.query
  const [clients, setClients] = useState([])
//const router: any = useRouter()

  const gettingData = async () => {
    await ApiGetCategory(`subCourse/content/${id}`, (data, error) => {
      if (error) return console.error(error)
      setClients(data)
      console.log(data)
    })
    return
  }

  useEffect(() => {
    if (id) {
      gettingData()
    }
  }, [id])

  const [ids, setids] = useState()
  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [duration, setDuration] = useState(0)
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [isFree, setIsFree] = useState(false)
  const [Loading, setLoading] = useState(false)
  const perPage = 12

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages =Math.round( clients.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [ind, setInd] = useState(0)


  const handelSelectBtn = async (index: any, cId: any) => {
    setInd(clients.findIndex((item) => item.id === cId))
//    setId(cId)
    setIsModalInfoActive(true)
  }
  const handleCancelAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handelDeleteAction = async () => {
    setLoading(true)
    await ApiDeleteData('content', ids, (data) => {
      deleteFile(clients[ind]?.videoURL)
      if (!data)
        return (
          <>
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
          </>
        )
 router.reload()  
    setLoading(false)
    })
    router.reload()

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleModalAction = async () => {
    setLoading(true)
    await ApiUpdateData(
      'content',
      { id: ids, titleAr, titleEn, descriptionAr, descriptionEn, isFree, duration },
      (data) => {
        if (data.error)
          return (
            <>
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
            </>
          )
        setLoading(false)
router.reload()  
    }
    )
 router.reload()

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      {Loading && (
        <div className="text-center h-[60vh] flex items-center justify-center z-999 absolute top-[20%] left-[50%]">
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
      )}
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
            title="Sample modal"
            buttonColor="info"
            buttonLabel="Done"
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
  onCancel={() => handleCancelAction()}
          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title arabic
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={clients[ind]?.titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title English
                  </label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={clients[ind]?.titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    description Arabic
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    id="phoneNumber"
                    defaultValue={clients[ind]?.descriptionAr}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="levelOfExperience"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    description English
                  </label>
                  <input
                    type="text"
                    defaultValue={clients[ind]?.descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    id="levelOfExperience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Any data"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="levelOfExperience"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration
                  </label>
                  <input
                    type="number"
                    defaultValue={clients[ind]?.duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    id="levelOfExperience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1.3, 4.5 ...."
                    required
                  />
                </div>
                <div className="flex items-center justify-center mt-6">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    defaultValue={clients[ind]?.isFree}
                    onClick={() => setIsFree(!isFree)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I it Free?
                  </label>
                </div>
              </div>
            </form>
          </CardBoxModal>

          <CardBoxModal
            title="Please confirm"
            buttonColor="danger"
            buttonLabel="Confirm"
            isActive={isModalTrashActive}
            onConfirm={handelDeleteAction}
            onCancel={() => {
              setIsModalTrashActive(false)
              setLoading(false)
            }}
          >
            <p>
              Are you sure you want to delete this <b> {clients[ind]?.titleAr} </b> ??
            </p>
          </CardBoxModal>

          <table>
            <thead>
              <tr>
                <th />
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {clientsPaginated.map((client: Client, index: number) => (
                <tr key={client.id}>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    {client.imgUrl && (
                      <Image src={client.imgUrl} width={64} height={64} alt="Images" />
                    )}
                  </td>
                  <td data-label="nickName">{client.titleAr}</td>
                  <td data-label="Name">{client.titleEn}</td>
                  <td data-label="Email">{client.descriptionAr}</td>
                  <td data-label="PhoneNumber">{client.descriptionEn}</td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{client.created_at}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      {client.active ? (
                        <div>
                          <Button
                            color="info"
                            icon={mdiEye}
                            onClick={() => handelSelectBtn(index, client.id)}
                            small
                          />
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => {
                              setInd(index)
                              setids(client.id)
                              setIsModalTrashActive(true)
                            }}
                            small
                          />
                        </div>
                      ) : (
                        <>
                          <Button
                            color="success"
                            icon={mdiAccountReactivate}
                            onClick={() => {
                              setids(client.id)
                              setIsModalTrashActive(true)
                            }}
                            small
                          />
                        </>
                      )}
                    </Buttons>
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
