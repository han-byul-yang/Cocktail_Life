import { useState } from 'react'
import { AxiosResponse } from 'axios'

import { cocktailApis } from 'services/getApis'

const getApiData = async (api: (params: string) => Promise<AxiosResponse<any, any>>, params: string) => {
  /* const [apiError, setApiError] = useState(false)
  const [api, setApi] = useState<(params: string) => Promise<AxiosResponse<any, any>>>(() =>
    cocktailApis.searchById('00000')
  )
  const [params, setParams] = useState('')
*/
  try {
    const { data } = await api(params)
    return data
  } catch (error) {
    console.log(error)
    return ''
  }
}

export default getApiData

// type axios 재정의
