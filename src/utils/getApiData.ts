import { AxiosResponse } from 'axios'

const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  const { data } = await api(params)
  return data
}

export default getApiData
