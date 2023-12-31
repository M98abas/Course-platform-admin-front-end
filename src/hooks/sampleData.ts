import useSWR from 'swr'
import { BASE_URL } from '../api/api'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const myHeaders = new Headers()
myHeaders.append('token', token)

const requestOptions: any = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
}

const fetcher = (url: string) => fetch(url, requestOptions).then((res) => res.json())

export const useSampleClients = (route) => {
  const { data, error } = useSWR(`${BASE_URL}/${route}`, fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}


export const useSampleClientsId = (route, id) => {
  const { data, error } = useSWR(`${BASE_URL}/${route}/${id}`, fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/admin-one-react-tailwind/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
