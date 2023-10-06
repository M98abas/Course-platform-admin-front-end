import {
  mdiAccountReactivate,
  mdiAlertDecagramOutline,
mdiCheckAll,
  mdiCheckDecagram,
  mdiEye,
  mdiTrashCan,
} from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import {ApiActiveData, ApiDeleteData, ApiUpdateData } from '../../api/api'
import Icon from '../Icon'
import { useRouter } from 'next/router'

const TableSampleClients = ({ columns }) => {
  const { clients } = useSampleClients('constractor')
//  console.log(clients)
const router: any = useRouter()

  const [id, setid] = useState()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [city, setcity] = useState('')
  const [levelOfExperience, setlevelOfExperience] = useState('')
  const [refererCode, setrefererCode] = useState('')
  const [Loading, setLoading] = useState(false)

  const perPage = 12
  const handelSelectBtn = async (index: any, cId: any) => {
//console.log(clients.findIndex((item) => item.id === cId));
//    console.log(index,cId);

    setInd(clients.findIndex((item) => item.id === cId))
    setid(cId)
    setIsModalInfoActive(true)
  }

  const handleCancelAction = () => {
setIsModaActiveActive(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages =Math.round(clients.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

const [isModalActiveActive, setIsModaActiveActive] = useState(false)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [ind, setInd] = useState(0)

  const handelDeleteAction = async () => {
//    setLoading(true)
    await ApiDeleteData('constractor', id, (data) => {
//console.log(data)      
if (data.errMsg != '') return(<p>Error</p>)
setLoading(false)
router.reload()
//      setLoading(false)
    })

    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

const handelActivateAction = async () => {
//    setLoading(true)
    await ApiActiveData('constractor', id, (data) => {
console.log(id)
if (data.errMsg != '') return(<p>Error</p>)
setLoading(false)
router.reload()
    })

setIsModaActiveActive(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }



  const handleModalAction = async () => {
    setLoading(true)
    await ApiUpdateData(
      'constractor',
      { id, name, email, phoneNumber, city, levelOfExperience, refererCode },
      (data) => {
        if (data.erMsg != '')
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
      }
    )
//    router.reload()

    setLoading(false)
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

const handelVerifyAction= async () =>{

await ApiUpdateData(
      'constractor',
      { id, isDoubleVerfy:true },
      (data) => {
console.log(data);

        if (data.errMsg != '')
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
      })
}

  const handelSearchInputChanged = (e) => {
    if (e.key == 'Enter' && e.target.value != '')
      clients.map((client, index) => {
        if (client.email == e.target.value.trim()) {
          setInd(index)
          setIsModalInfoActive(true)
        }
      })
e.target.value =''
    return
  }
  return (
    <>
      {Loading ? (
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
      ) : (
        ''
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
            classData="xl:w-9/12"
            isActive={isModalInfoActive}
            onConfirm={handleModalAction}
            onCancel={() => handleCancelAction()}

          >
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-5">
                <div className="row-span-3 h-auto w-auto  flex justify-center align-middle">
                  <img src={clients[ind]?.imageUrl}  alt="Img" />
                </div>
		<div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setname(e.target.value)}
                    defaultValue={clients[ind]?.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setemail(e.target.value)}
                    defaultValue={clients[ind]?.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    phoneNumber
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setname(e.target.value)}
                    defaultValue={clients[ind]?.phoneNumber}
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="levelOfExperience"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    level Of Experience
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setemail(e.target.value)}
                    defaultValue={clients[ind]?.levelOfExperience}
                    id="levelOfExperience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="levelOfExperience"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Refering Points
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setemail(e.target.value)}
                    defaultValue={clients[ind]?.referingPoints}
                    id="levelOfExperience"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contry"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    contry
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setphoneNumber(e.target.value)}
                    defaultValue={clients[ind]?.contry}
                    id="contry"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    city
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setcity(e.target.value)}
                    defaultValue={clients[ind]?.city}
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    date Of Birth
                  </label>
                  <input
                    defaultValue={clients[ind]?.dateOfBirth}
                    type="text"
                    onChange={(e) => setlevelOfExperience(e.target.value)}
                    id="dateOfBirth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactWith"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    contact With
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setrefererCode(e.target.value)}
                    id="contactWith"
                    defaultValue={clients[ind]?.contactWith}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center">
                {clients[ind]?.active ? (
<>
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setid(clients[ind].id)
                      setIsModalTrashActive(true)
                    }}
                    small
                  />
{!clients[ind]?.isDoubleVerfy ?(
 <Button
                    color="success"
                    icon={mdiCheckAll}
                    onClick={() => handelVerifyAction()}
                    small
                  />
) :''}
</>
                ) : (
                  <Button
                    color="success"
                    icon={mdiAccountReactivate}
                    onClick={() => {
console.log(clients[ind].id);
                      setid(clients[ind].id)
                      setIsModaActiveActive(true)
                    }}
                    small
                  />
                )}
              </div>
            </form>
          </CardBoxModal>

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

 <CardBoxModal
            title="Please confirm"
            buttonColor="info"
            buttonLabel="Confirm"
            isActive={isModalActiveActive}
            onConfirm={handelActivateAction}
            onCancel={() => handleCancelAction()}
          >
            <p>
              Are you sure you want to Active <b>{clients[ind]?.email}</b>??
            </p>
          </CardBoxModal>

          <div className="pb-4 mb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onKeyDown={handelSearchInputChanged}
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
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
                  <td data-label="nickName" className="flex items-center justify-center">
                 {client.isVerfy == client.isDoubleVerfy ?? (
                      <Icon
                        path={mdiCheckDecagram}
                        size={64}
                      />
                    ) }

                  </td>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    <img src={client?.imageUrl} alt="User img" className="w-12 h-auto" />
                  </td>
                  <td data-label="nickName">{client.nickName}</td>
                  <td data-label="Email">{client.email}</td>
                  <td data-label="LevelOfExperience">{client.levelOfExperience}</td>
                  <td data-label="referingPoints" className="lg:w-32">
                    <progress
                      className={`flex w-2/5 self-center lg:w-${
                        parseInt(client?.referingPoints) % 70
                      }`}
                      max="100"
                      defaultValue={client.referingPoints}
                    >
                      {client.referingPoints}
                    </progress>
                  </td>
                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{client.created_at}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      {client.active ? (
                        <>
                          <Button
                            color="info"
                            className="mr-2"
                            icon={mdiEye}
                            onClick={() => handelSelectBtn(index, client.id)}
                            small
                          />
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
                        </>
                      ) : (
                        <>
                          <Button
                            color="info"
                            className="mr-2"
                            icon={mdiEye}
                            onClick={() => {
//console.log(clients.findIndex((item) => item.id === client.id));
                              setInd(index)
                              setid(client.id)
                               setIsModalInfoActive(true)
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
