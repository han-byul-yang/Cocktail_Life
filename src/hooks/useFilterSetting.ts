import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filteredItemAtom } from 'store/atom'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { IFilterKind } from 'types/types'

const useFilterSetting = () => {
  const [filtering, setFiltering] = useRecoilState(filteredItemAtom)

  const filter = {
    SINGLE: {
      CANCEL_SAME_ITEM: (filterKind: string) => {
        setFiltering((prevFilter: IFilterKind) => {
          return { ...prevFilter, [filterKind]: '' }
        })
      },
      TRANSFER_TO_DIFF_ITEM: (filterKind: string, clickedItem: string) => {
        setFiltering((prevFilter: IFilterKind) => {
          return { ...prevFilter, [filterKind]: clickedItem }
        })
      },
    },
    MULTI: {
      CANCEL_SAME_ITEM: (filterKind: string, clickedItem: string) => {
        const filterItemList = filtering[filterKind].split(',').map((kind) => kind.trim())
        const lastItemDeleted = filterItemList.filter((item) => item !== clickedItem).join(',')

        setFiltering((prevFilter: IFilterKind) => {
          return {
            ...prevFilter,
            [filterKind]: lastItemDeleted,
          }
        })
      },
      ADD_DIFF_ITEM: (filterKind: string, clickedItem: string) => {
        setFiltering((prevFilter: IFilterKind) => {
          return {
            ...prevFilter,
            [filterKind]: prevFilter[filterKind] !== '' ? `${prevFilter[filterKind]}, ${clickedItem}` : clickedItem,
          }
        })
      },
    },
  }

  return filter
}

export default useFilterSetting