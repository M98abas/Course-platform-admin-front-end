import dotenv from 'dotenv'
const process = dotenv.process

export const localStorageDarkModeKey = 'darkMode'

export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

export const appTitle = 'Xeenon App'

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitle} — ${appTitle}`

export const firebaseConfig = {
  apiKey: process.env.APIKEY,

  authDomain: process.env.AUTHDOMAIN,

  projectId: process.env.PROJECTID,

  storageBucket: process.env.STORAGEBUCKET,

  messagingSenderId: process.env.MESSAGINGSENDERID,

  appId: process.env.APPID,

  measurementId: process.env.MEASUREMENTID,
}
