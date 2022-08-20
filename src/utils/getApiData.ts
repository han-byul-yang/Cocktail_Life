import axios, { AxiosResponse } from 'axios'

const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  try {
    const { data } = await api(params)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) return error.message
    return error
  }
}

export default getApiData

// type axios 재정의
