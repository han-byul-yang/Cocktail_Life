import { AxiosResponse } from 'axios'

const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  const { data } = await api(params)
  return data
}

export default getApiData

// type axios 재정의
// error 디테일하게 다루기
// service getApis 와 같이넣기
