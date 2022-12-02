import { AxiosResponse } from 'axios'

interface IQueryKeysValue {
  queryName: string
  api: (params: string) => Promise<AxiosResponse<any, any>>
}

export interface IQueryKeys {
  [key: string]: IQueryKeysValue
}
