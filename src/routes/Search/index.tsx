import React, { Suspense, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetCocktailByIdQuery } from 'hooks/useFilterCocktailQuery'
import { useSearchByAlcoholicParamQuery } from 'hooks/useSearchCocktailQuery'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { IFilterKind } from 'types/types'
import SearchBar from './SearchBar'
import CocktailContainer from 'components/CocktailContainer'
import FilterContainer from './FilterContainer'

import styles from './search.module.scss'

const Search = () => {
  const [showChoseFilter, setShowChoseFilter] = useState<IFilterKind>(filteringInitialData)
  const [errorMessage, setErrorMessage] = useState('There is no result')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([])
  const [searchParams] = useSearchParams()
  const alcoholicParam = searchParams.get('alcoholic')
  const categoryParam = searchParams.get('category')
  const ingredientParam = searchParams.get('ingredient')

  const { resultData: filterCocktailTotalResult } = useGetCocktailByIdQuery(totalFilteredIdList, !!totalFilteredIdList)

  const { data: alcoholicResult } = useSearchByAlcoholicParamQuery(alcoholicParam)
  const { data: categoryResult } = useSearchByAlcoholicParamQuery(categoryParam)
  const { data: ingredientResult } = useSearchByAlcoholicParamQuery(ingredientParam)

  return (
    <div className={styles.searchPage}>
      {/* <Suspense fallback={<div>loading...</div>}> */}
      <SearchBar
        setFilterOpen={setIsFilterOpen}
        showChoseFilter={showChoseFilter}
        setTotalFilteredIdList={setTotalFilteredIdList}
      />
      {isFilterOpen && <FilterContainer setIsFilterOpen={setIsFilterOpen} setShowChoseFilter={setShowChoseFilter} />}
      <CocktailContainer
        resultData={filterCocktailTotalResult || alcoholicResult || categoryResult || ingredientResult}
        errorMessage={errorMessage}
      />
      {/* </Suspense> */}
    </div>
  )
}

export default Search

// 레이아웃 만들기
// 재검색시 검색결과 초기화
// filterCase => 개수 의미 들어가기
