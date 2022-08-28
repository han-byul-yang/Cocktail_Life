import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import useFilterSetting from 'hooks/useFilterSetting'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { filteredItemAtom } from 'store/atom'
import { IFilterKind } from 'types/types'

import styles from './filterBox.module.scss'

interface IFilterButtonsProps {
  filterKind: string
  filterList: string[]
  filterCase: string
}

const FilterBox = ({ filterKind, filterList, filterCase }: IFilterButtonsProps) => {
  // const [filterSetting, setFiltering] = useState<IFilterKind>(filteringInitialData)
  const filtering = useRecoilValue(filteredItemAtom)
  const filterSetting = useFilterSetting()
  const [isButtonClicked, setIsButtonClicked] = useState('')

  const handleFilterItemClick = (clickedItem: string) => {
    if (filterCase === 'single') {
      if (clickedItem === filtering[filterKind]) {
        filterSetting.SINGLE.CANCEL_SAME_ITEM(filterKind)
        setIsButtonClicked('')
      } else {
        filterSetting.SINGLE.TRANSFER_TO_DIFF_ITEM(filterKind, clickedItem)
        setIsButtonClicked(clickedItem)
      }
    } else {
      const filterItemList = filtering[filterKind].split(',')

      if (clickedItem === filterItemList[-1]) {
        filterSetting.MULTI.CANCEL_SAME_ITEM(filterKind, clickedItem)
        setIsButtonClicked('')
      } else {
        filterSetting.MULTI.ADD_DIFF_ITEM(filterKind, clickedItem)
        setIsButtonClicked(clickedItem)
      }
    }
  }

  return (
    <div className={styles.filterBox}>
      {filterKind.toUpperCase()}
      <div className={styles.filterButtons}>
        {filterList.map((item: string, iItem: number) => {
          const itemKey = `item-${iItem}`
          return (
            <button
              className={isButtonClicked === item ? styles.activeButton : styles.disActiveButton}
              key={itemKey}
              type='button'
              onClick={() => handleFilterItemClick(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(FilterBox)

// handleFilterChooseClick type 재설정
// [-1] 오류 고치기
