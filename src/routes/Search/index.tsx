import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

import useSearchByParams from 'hooks/useSearchByParams'
import {
  useFilterByAlcoholicQuery,
  useFilterByCategoryQuery,
  useFilterByIngredientQuery,
  useGetCocktailByIdQuery,
  useGetCocktailByNameQuery,
} from 'hooks/useTanstackQuery'
import eliminateSameItem from './utils/eliminateSameItem'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { filteredItemAtom } from 'store/atom'
import { IFilterKind } from 'types/types'
import SearchBar from './SearchBar'
import CocktailContainer from 'components/CocktailContainer'
import FilterContainer from './FilterContainer'

import styles from './search.module.scss'

const Search = () => {
  const filtering = useRecoilValue(filteredItemAtom)
  const [isSearchClick, setIsSearchClick] = useState(false)
  const [showChoseFilter, setShowChoseFilter] = useState<IFilterKind>(filteringInitialData)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([])
  const [inputKeyword, setInputKeyword] = useState('')
  const [errorMessage, setErrorMessage] = useState('There is no result')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const navigate = useNavigate()
  const { paramsSearchResult } = useSearchByParams()

  const { data: searchByNameResultData } = useGetCocktailByNameQuery(inputKeyword, isSearchClick)
  const { data: filterByAlcoholicResultData } = useFilterByAlcoholicQuery(filtering.alcoholic, isSearchClick)
  const { data: filterByCategoryResultData } = useFilterByCategoryQuery(filtering.category, isSearchClick)
  const { data: filterByIngredientResultData } = useFilterByIngredientQuery(filtering.ingredient, isSearchClick)
  const { resultData: totalResult } = useGetCocktailByIdQuery(totalFilteredIdList, !!totalFilteredIdList)

  useEffect(() => {}, [paramsSearchResult])

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
        ...(searchByNameResultData || []),
        ...(filterByAlcoholicResultData || []),
        ...(filterByCategoryResultData || []),
        ...(filterByIngredientResultData || []),
      ]

      setTotalFilteredIdList(eliminateSameItem(totalCocktailIdList, filterKindCount))
    }
  }, [
    filterByAlcoholicResultData,
    filterByCategoryResultData,
    filterByIngredientResultData,
    filtering.alcoholic,
    filtering.category,
    filtering.ingredient,
    inputKeyword,
    isSearchClick,
    searchByNameResultData,
  ])

  return (
    <div className={styles.searchPage}>
      <SearchBar
        inputKeyword={inputKeyword}
        setInputKeyword={setInputKeyword}
        setFilterOpen={setIsFilterOpen}
        showChoseFilter={showChoseFilter}
        setIsSearchClick={setIsSearchClick}
      />
      {isFilterOpen && <FilterContainer setIsFilterOpen={setIsFilterOpen} setShowChoseFilter={setShowChoseFilter} />}
      <CocktailContainer totalResult={totalResult} errorMessage={errorMessage} />
    </div>
  )
}

export default Search

// 레이아웃 만들기
// 재검색시 검색결과 초기화
// filterCase => 개수 의미 들어가기
