import { AxiosResponse } from 'axios'

const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  try {
    const { data } = await api(params)
    return data
  } catch (error) {
    throw Error('Some error occured in your network')
  }
}

export default getApiData

// type axios 재정의
// error 디테일하게 다루기
