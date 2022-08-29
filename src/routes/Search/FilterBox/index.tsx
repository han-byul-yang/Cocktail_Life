import React from 'react'

import useFilterSetting from 'hooks/useFilterSetting'

import styles from './filterBox.module.scss'

interface IFilterButtonsProps {
  filterKind: string
  filterList: string[]
  filterCase: string
}

const FilterBox = ({ filterKind, filterList, filterCase }: IFilterButtonsProps) => {
  const { filter, filterState } = useFilterSetting()

  const handleFilterItemClick = (clickedItem: string) => {
    if (filterCase === 'single') {
      if (clickedItem === filterState[filterKind]) {
        filter.SINGLE.CANCEL_SAME_ITEM(filterKind)
      } else {
        filter.SINGLE.TRANSFER_TO_DIFF_ITEM(filterKind, clickedItem)
      }
    } else {
      const filterItemList = filterState[filterKind].split(',').map((kind) => kind.trim())

      if (filterItemList.includes(clickedItem)) {
        filter.MULTI.CANCEL_SAME_ITEM(filterKind, clickedItem)
      } else {
        filter.MULTI.ADD_DIFF_ITEM(filterKind, clickedItem)
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
              className={
                filterState[filterKind]
                  .split(',')
                  .map((kind) => kind.trim())
                  .includes(item)
                  ? styles.activeButton
                  : styles.disActiveButton
              }
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
