import { useRecoilValue, useResetRecoilState } from 'recoil'

import { alcoholicList, categoryList, ingredientList } from 'store/initialData/initialListData'
import { filteredItemAtom } from 'store/atom'
import { IFilterKind } from 'types/types'
import FilterBox from './FilterBox'
import Button from 'components/Button'

import styles from './filterContainer.module.scss'
import React, { Dispatch } from 'react'

interface IFilterContainerProps {
  setIsFilterOpen: Dispatch<React.SetStateAction<boolean>>
  setShowChoseFilter: Dispatch<React.SetStateAction<IFilterKind>>
}

const FilterContainer = ({ setIsFilterOpen, setShowChoseFilter }: IFilterContainerProps) => {
  const filtering = useRecoilValue(filteredItemAtom)
  const filteringReset = useResetRecoilState(filteredItemAtom)

  const handleApplyFilterClick = () => {
    setIsFilterOpen(false)
    setShowChoseFilter(filtering)
  } // 함수 이름에 맞게 수정 필요

  const handleCancelFilterClick = () => {
    setIsFilterOpen(false)
    filteringReset()
  }

  return (
    <>
      <div className={styles.filterBackground} />
      <div className={styles.filterContainer}>
        <FilterBox filterKind='alcoholic' filterList={alcoholicList} filterCase='single' />
        <FilterBox filterKind='category' filterList={categoryList} filterCase='single' />
        <FilterBox filterKind='ingredient' filterList={ingredientList} filterCase='multiple' />
        <Button handleClick={handleApplyFilterClick} size='small'>
          APPLY
        </Button>
        <Button handleClick={handleCancelFilterClick} size='small'>
          CANCEL
        </Button>
      </div>
    </>
  )
}

export default FilterContainer
