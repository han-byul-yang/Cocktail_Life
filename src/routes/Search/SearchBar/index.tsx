import { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { IFilterKind } from 'types/types'
import {
  useGetCocktailByNameQuery,
  useFilterByAlcoholicQuery,
  useFilterByCategoryQuery,
  useFilterByIngredientQuery,
  useGetCocktailByIdQuery,
} from 'hooks/useFilterCocktailQuery'
import eliminateSameItem from '../utils/eliminateSameItem'
import { filteredItemAtom } from 'store/atom'
import Button from 'components/Button'

import { FilterIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  setFilterOpen: Dispatch<React.SetStateAction<boolean>>
  showChoseFilter: IFilterKind
  setTotalFilteredIdList: Dispatch<React.SetStateAction<string[]>>
}

const SearchBar = ({ setFilterOpen, showChoseFilter, setTotalFilteredIdList }: ISearchBarProps) => {
  const [isSearchClick, setIsSearchClick] = useState(false)
  const [inputKeyword, setInputKeyword] = useState('')
  const filtering = useRecoilValue(filteredItemAtom)

  const { data: searchByNameIdResult } = useGetCocktailByNameQuery(inputKeyword, isSearchClick)
  const { data: filterByAlcoholicIdResult } = useFilterByAlcoholicQuery(filtering.alcoholic, isSearchClick)
  const { data: filterByCategoryIdResult } = useFilterByCategoryQuery(filtering.category, isSearchClick)
  const { data: filterByIngredientIdResult } = useFilterByIngredientQuery(filtering.ingredient, isSearchClick)

  useEffect(() => {
    if (isSearchClick) {
      let filterKindCount = 0

      if (inputKeyword !== '') {
        filterKindCount += 1
      }
      if (filtering.alcoholic !== '') {
        filterKindCount += 1
      }
      if (filtering.category !== '') {
        filterKindCount += 1
      }
      if (filtering.ingredient !== '') {
        filterKindCount += 1
      }

      const totalCocktailIdList = [
        ...(searchByNameIdResult || []),
        ...(filterByAlcoholicIdResult || []),
        ...(filterByCategoryIdResult || []),
        ...(filterByIngredientIdResult || []),
      ]

      setTotalFilteredIdList(eliminateSameItem(totalCocktailIdList, filterKindCount))
      setIsSearchClick(false)
    }
  }, [
    filterByAlcoholicIdResult,
    filterByCategoryIdResult,
    filterByIngredientIdResult,
    filtering.alcoholic,
    filtering.category,
    filtering.ingredient,
    inputKeyword,
    isSearchClick,
    searchByNameIdResult,
    setTotalFilteredIdList,
  ])

  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  const handleOpenFilterClick = () => {
    setFilterOpen(true)
  }

  const handleSearchClick = () => {
    setIsSearchClick(true)
  }

  return (
    <form className={styles.searchForm}>
      <input
        type='search'
        placeholder='Input cocktail name ...'
        value={inputKeyword}
        onChange={handleInputKeywordChange}
      />

      <div className={styles.filterList}>
        <FilterIcon className={styles.filterIcon} />
        <ul>
          {Object.keys(showChoseFilter).map((filterKey) => (
            <li key={filterKey}>
              {filterKey}: {showChoseFilter[filterKey]} /
            </li>
          ))}
        </ul>
      </div>

      <Button handleClick={handleOpenFilterClick} size='big'>
        FILTER
      </Button>
      <Button handleClick={handleSearchClick} size='big'>
        SEARCH
      </Button>
    </form>
  )
}

export default SearchBar
