import { useRecoilState } from 'recoil'

import { filteredItemAtom } from 'store/atom'
import { IFilterKind } from 'types/filterKindType'

const useFilterSetting = (filterKind: string) => {
  const [filterState, setFilterState] = useRecoilState(filteredItemAtom)

  const filtering = {
    SINGLE: {
      CANCEL_SAME_ITEM: () => {
        setFilterState((prevFilter: IFilterKind) => ({ ...prevFilter, [filterKind]: '' }))
      },
      TRANSFER_TO_DIFF_ITEM: (clickedItem: string) => {
        setFilterState((prevFilter: IFilterKind) => ({ ...prevFilter, [filterKind]: clickedItem }))
      },
    },
    MULTI: {
      CANCEL_SAME_ITEM: (clickedItem: string) => {
        const filterItemList = filterState[filterKind].split(',').map((kind) => kind.trim())
        const lastItemDeleted = filterItemList.filter((item) => item !== clickedItem).join(',')

        setFilterState((prevFilter: IFilterKind) => ({
          ...prevFilter,
          [filterKind]: lastItemDeleted,
        }))
      },
      ADD_DIFF_ITEM: (clickedItem: string) => {
        setFilterState((prevFilter: IFilterKind) => ({
          ...prevFilter,
          [filterKind]: prevFilter[filterKind] !== '' ? `${prevFilter[filterKind]}, ${clickedItem}` : clickedItem,
        }))
      },
    },
  }

  return { filtering, filterState }
}

export default useFilterSetting
