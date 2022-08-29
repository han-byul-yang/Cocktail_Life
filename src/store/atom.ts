import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { ICocktailData, IFilterKind } from 'types/types'
import { cocktailInitialData, filteringInitialData } from './initialData/initialApiData'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: localStorage,
})

export const cocktailDataAtom = atom<ICocktailData[]>({
  key: 'cocktailData',
  default: [cocktailInitialData],
  effects_UNSTABLE: [persistAtom],
})

export const filteredItemAtom = atom<IFilterKind>({
  key: 'filteredItem',
  default: filteringInitialData,
})
