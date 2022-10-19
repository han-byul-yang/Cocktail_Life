import useFilterSetting from 'hooks/useFilterSetting'

import styles from './filterBox.module.scss'

interface IFilterButtonsProps {
  filterKind: string
  filterList: string[]
  filterCase: string
}

const FilterBox = ({ filterKind, filterList, filterCase }: IFilterButtonsProps) => {
  const { filtering, filterState } = useFilterSetting(filterKind)

  const handleFilterItemClick = (clickedItem: string) => {
    if (filterCase === 'single') {
      if (clickedItem === filterState[filterKind]) {
        filtering.SINGLE.CANCEL_SAME_ITEM()
      } else {
        filtering.SINGLE.TRANSFER_TO_DIFF_ITEM(clickedItem)
      }
    } else {
      const filterItemList = filterState[filterKind].split(',').map((kind) => kind.trim())

      if (filterItemList.includes(clickedItem)) {
        filtering.MULTI.CANCEL_SAME_ITEM(clickedItem)
      } else {
        filtering.MULTI.ADD_DIFF_ITEM(clickedItem)
      }
    }
  }

  return (
    <div className={styles.filterBox}>
      {filterKind.toUpperCase()}
      <ul className={styles.filterButtons}>
        {filterList.map((item: string, iItem: number) => {
          const itemKey = `item-${iItem}`
          return (
            <li key={itemKey}>
              <button
                className={
                  filterState[filterKind]
                    .split(',')
                    .map((kind) => kind.trim())
                    .includes(item)
                    ? styles.activeButton
                    : styles.disActiveButton
                }
                type='button'
                onClick={() => handleFilterItemClick(item)}
              >
                {item}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FilterBox
