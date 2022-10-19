import { atom } from 'recoil'

import { IFilterKind } from 'types/filterKindType'
import { clickedKeywordInitialData, filtersInitialData } from './initialData/initialApiData'

export const filteredItemAtom = atom<IFilterKind>({
  key: 'filteredItem',
  default: filtersInitialData,
})

export const clickedSearchKeywordAtom = atom<IFilterKind>({
  key: 'clickedSearchKeyword',
  default: clickedKeywordInitialData,
})

export const errorMessageAtom = atom({
  key: 'errorMessage',
  default: '',
})

export const isOpenErrorModalAtom = atom({
  key: 'isOpenErrorModal',
  default: false,
})
