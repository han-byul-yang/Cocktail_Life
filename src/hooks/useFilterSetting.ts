import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { filteredItemAtom } from 'store/atom'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { IFilterKind } from 'types/types'

const useFilterSetting = () => {
  const [filterState, setFilterState] = useRecoilState(filteredItemAtom)

  const filter = {
    SINGLE: {
      CANCEL_SAME_ITEM: (filterKind: string) => {
        setFilterState((prevFilter: IFilterKind) => {
          return { ...prevFilter, [filterKind]: '' }
        })
      },
      TRANSFER_TO_DIFF_ITEM: (filterKind: string, clickedItem: string) => {
        setFilterState((prevFilter: IFilterKind) => {
          return { ...prevFilter, [filterKind]: clickedItem }
        })
      },
    },
    MULTI: {
      CANCEL_SAME_ITEM: (filterKind: string, clickedItem: string) => {
        const filterItemList = filterState[filterKind].split(',').map((kind) => kind.trim())
        const lastItemDeleted = filterItemList.filter((item) => item !== clickedItem).join(',')

        setFilterState((prevFilter: IFilterKind) => {
          return {
            ...prevFilter,
            [filterKind]: lastItemDeleted,
          }
        })
      },
      ADD_DIFF_ITEM: (filterKind: string, clickedItem: string) => {
        setFilterState((prevFilter: IFilterKind) => {
          return {
            ...prevFilter,
            [filterKind]: prevFilter[filterKind] !== '' ? `${prevFilter[filterKind]}, ${clickedItem}` : clickedItem,
          }
        })
      },
    },
  }

  return { filter, filterState }
}

export default useFilterSetting

// filter, filterState 변수명 FilterBox 변수명이랑 통일하기
