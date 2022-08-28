import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

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
  // const [filtering, setFiltering] = useState<IFilterKind>(filteringInitialData)
  const [filtering, setFiltering] = useRecoilState(filteredItemAtom)
  const [isButtonClicked, setIsButtonClicked] = useState('')

  const handleFilterItemClick = (clickedItem: string) => {
    if (filterCase === 'single') {
      if (clickedItem === filtering[filterKind]) {
        setFiltering((prevFilter) => {
          return { ...prevFilter, [filterKind]: '' }
        })
        setIsButtonClicked('')
      } else {
        setFiltering((prevFilter) => {
          return { ...prevFilter, [filterKind]: clickedItem }
        })
        setIsButtonClicked(clickedItem)
      }
    } else {
      const filterItemList = filtering[filterKind].split(',')

      if (clickedItem === filterItemList[-1]) {
        const lastItemDeleted = filterItemList.filter((item) => item !== clickedItem).join(',')

        setFiltering((prevFilter) => {
          return {
            ...prevFilter,
            [filterKind]: lastItemDeleted,
          }
        })
        setIsButtonClicked('')
      } else {
        setFiltering((prevFilter) => {
          return {
            ...prevFilter,
            [filterKind]: prevFilter[filterKind] !== '' ? `${prevFilter[filterKind]}, ${clickedItem}` : clickedItem,
          }
        })
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
