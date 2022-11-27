import React, { Dispatch } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { alcoholicList, categoryList, ingredientList } from 'constants/initialFilterDataList'
import { filteredItemAtom } from 'store/atom'
import { IFilterKind } from 'types/filterKindType'
import FilterBox from './FilterBox'
import Button from 'components/Button'

import styles from './filterContainer.module.scss'

interface IFilterContainerProps {
  setIsFilterOpen: Dispatch<React.SetStateAction<boolean>>
  setShowChoseFilter: Dispatch<React.SetStateAction<IFilterKind>>
}

const FilterContainer = ({ setIsFilterOpen, setShowChoseFilter }: IFilterContainerProps) => {
  const filters = useRecoilValue(filteredItemAtom)
  const filtersReset = useResetRecoilState(filteredItemAtom)

  const handleApplyFilterClick = () => {
    setIsFilterOpen(false)
    setShowChoseFilter(filters)
  }

  const handleCancelFilterClick = () => {
    setIsFilterOpen(false)
    filtersReset()
  }

  return (
    <>
      <div className={styles.filterBackground} />
      <div className={styles.filterContainer}>
        <FilterBox filterKind='alcoholic' filterList={alcoholicList} filterCase='single' />
        <FilterBox filterKind='category' filterList={categoryList} filterCase='single' />
        <FilterBox filterKind='ingredient' filterList={ingredientList} filterCase='multiple' />
        <div className={styles.filterButtons}>
          <Button handleClick={handleApplyFilterClick} size='big'>
            APPLY
          </Button>
          <Button handleClick={handleCancelFilterClick} size='big'>
            CANCEL
          </Button>
        </div>
      </div>
    </>
  )
}

export default FilterContainer
