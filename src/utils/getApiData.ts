import { AxiosResponse } from 'axios'

const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  try {
    const { data } = await api(params)
    return data
  } catch (error) {
    throw Error('데이터를 불러오는 과정 중 문제가 생겼습니다')
  }
}

export default getApiData

// type axios 재정의
// error 디테일하게 다루기
