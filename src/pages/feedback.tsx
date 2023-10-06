import firebase, { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/feedback'
import { getPageTitle, firebaseConfig } from '../config'
import CardBoxModal from '../components/CardBox/Modal'
import { ApiAddData, ApiGetCategory } from '../api/api'
import FormData from 'form-data'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'

const Content = () => {
  const columns: Array<string> = ['Img', 'title', 'target', 'courseId', 'Created at', 'actions']
  const [courses, setCourses] = useState([])
  const router = useRouter()

  const handleCancelAction = () => {
    setIsModalInfoActive(false)
  }

  useEffect(() => {
    ApiGetCategory('course', (data) => {
      if (data.errMsg == '') return <p>{data.error}</p>
      setCourses(data)
      return
    })
  }, [])
  const [error, setError] = useState(false)

  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [isCertificate, setIsCertificate] = useState(false)
  const [isAudio, setIsAudio] = useState(false)
  const [courseId, setCourseId] = useState(0)
  const [uploadProgress, setUploadProgress]: any = useState(100)
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [urlItem, setUrlItem] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [Loading, setLoading] = useState(false)

  const AccessKey: any = '0ab3b59c-9e97-4222-8714f68aa60d-45f5-4bbd'
  const uploadFile = async (fileName: string, filePath: string, path: string) => {
    const fileProcess: string = fileName.replace(/\s+/g, '')

    const data = new FormData()
    data.append('data', filePath)
    try {
      const response = await axios({
        method: 'PUT',
        url: `https://storage.bunnycdn.com/xenon-app/${path}/${fileProcess}`,
        headers: {
          AccessKey,
          'content-type': 'application/octet-stream',
        },
        data: filePath,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100
          setEnabled(progress == 100)
          setUploadProgress(progress)
        },
      })

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const handleImgUpload = async (file: any) => {
    // Initialize Firebase app
    const app = initializeApp(firebaseConfig)

    // Get a reference to the Firebase Storage service
    const storage = getStorage(app)

    // Reference to the root of your storage
    // const storageRef = ref(storage);

    // Reference to the child path where you want to upload the file
    const storageRef = ref(storage, `images/${file.name}`)

    // Now, you can upload the file to the 'images' path
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!')

        // Get the download URL for the uploaded file
        return getDownloadURL(storageRef)
      })
      .then((url) => {
        setEnabled(true)
        setUploadProgress(100)
        // `url` contains the URL of the uploaded file
        setUrlItem(url)
      })
      .catch((error) => {
        console.error('Error uploading or getting image URL:', error)
      })
  }
  const handleFileUpload = (e) => {
    const fileInput = e.target
    if (!fileInput.files) {
      alert('No file was chosen')
      return
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Files list is empty')
      return
    }

    const file = fileInput.files[0]
    //    console.log(file.type)
    if (isAudio) uploadingFile(file)
    else handleImgUpload(file)
    /** Setting file state */
    e.currentTarget.type = 'text'
    e.currentTarget.type = 'file'
  }

  const uploadingFile = async (file: any) => {
    const dataVideo: any = await uploadFile(file.name, file, 'audio')
    if (dataVideo.request.responseURL) setUrlItem(`https://XeenonLtd.b-cdn.net/audio/${file.name}`)
    else setError(true)
    //    setUrlItem(dataVideo?.request.responseURL)
    return
  }

  const handleModalAction = async () => {
    setLoading(true)

    await ApiAddData(
      'feedback',
      { isCertificate, isAudio, title, target, courseId, URL: urlItem },
      (data) => {
        console.log('data --> ', data)
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
            // router.reload()
          )

        setUploadProgress(0)
        setEnabled(!enabled)
        setTitle('')
        setTarget('')
        setCourseId(0)
        setUrlItem('')
        router.reload()
        return
      }
    )
    //router.reload();

    setLoading(false)
    setIsModalInfoActive(false)
  }

  const handleTargetChange = (e) => {
    setIsAudio(false)
    setTarget(e.target.value)
  }

  return (
    <>
      {!Loading ? (
        <>
          <Head>
            <title>{getPageTitle('Feedback')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="Feedback" main>
              <Button
                onClick={() => setIsModalInfoActive(true)}
                label="Add New"
                color="contrast"
                roundedFull
                small
              />
            </SectionTitleLineWithButton>

            <CardBox className="mb-6" hasTable>
              <TableSampleClients columns={columns} />
              <CardBoxModal
                title="Add New"
                buttonColor="info"
                buttonLabel="Done"
                disabled={!enabled}
                classData="xl:w-8/12"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={() => handleCancelAction()}
              >
                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => setTitle(e.target.value)}
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
                        Choose (Traders or Trainers)
                      </label>
                      <select
                        onChange={handleTargetChange}
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text"
                      >
                        <option value="Select" selected>
                          {' '}
                          Select One
                        </option>
                        <option value="Traders">Traders(Funded account) </option>
                        <option value="Trainers">Trainers</option>
                      </select>
                    </div>
                    {target != 'Traders' && (
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Is Audio
                        </label>
                        <input
                          type="checkbox"
                          id="email"
                          onChange={(e) => setIsAudio(e.target.value == 'on' ? true : false)}
                          className="bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Any data"
                          required
                          checked={isAudio}
                        />
                      </div>
                    )}
                    {target == 'Traders' && (
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Is Certificated
                        </label>
                        <input
                          type="checkbox"
                          id="email"
                          onChange={(e) => setIsCertificate(e.target.value == 'on' ? true : false)}
                          className="bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Any data"
                          required
                        />
                      </div>
                    )}
                    {target != 'Traders' && (
                      <div>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Choose course to add this feedback to
                        </label>
                        <select
                          onChange={(e: any) => setCourseId(parseInt(e.target.value))}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value={'nor-v'} key={'nor'} selected>
                            choose One
                          </option>
                          {courses?.map((data: any) => (
                            <option value={data.id} key={data.id}>
                              {data.titleEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-44 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Click to upload {isAudio ? 'voice' : 'image'}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isAudio ? 'MP3' : 'jpg, png ... etc'}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-5">
                          <div
                            className={`bg-blue-600 h-2.5 rounded-full ${
                              enabled ? 'bg-green-600' : ''
                            }`}
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </form>
              </CardBoxModal>
            </CardBox>
          </SectionMain>
        </>
      ) : (
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
    </>
  )
}

Content.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Content
