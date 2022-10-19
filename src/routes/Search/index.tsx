import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useGetCocktailByIdQuery } from 'hooks/useFilterCocktailQuery'
import {
  useSearchByAlcoholicQuery,
  useSearchByCategoryQuery,
  useSearchByIngredientQuery,
} from 'hooks/useSearchCocktailQuery'
import { clickedSearchKeywordAtom } from 'store/atom'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { IFilterKind } from 'types/filterKindType'
import SearchBar from './SearchBar'
import CocktailContainer from 'components/CocktailContainer'
import FilterContainer from './FilterContainer'

import styles from './search.module.scss'

const Search = () => {
  const [showChoseFilter, setShowChoseFilter] = useState<IFilterKind>(filteringInitialData)
  const [errorMessage, setErrorMessage] = useState('There is no result')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([])
  const clickedSearchKeyword = useRecoilValue(clickedSearchKeywordAtom)

  const { isLoading, resultData: filterCocktailTotalResult } = useGetCocktailByIdQuery(
    totalFilteredIdList,
    !!totalFilteredIdList
  )

  const { data: alcoholicResult } = useSearchByAlcoholicQuery(clickedSearchKeyword.alcoholic)
  const { data: categoryResult } = useSearchByCategoryQuery(clickedSearchKeyword.category)
  const { data: ingredientResult } = useSearchByIngredientQuery(clickedSearchKeyword.ingredient)

  return (
    <div className={styles.searchPage}>
      <SearchBar
        setFilterOpen={setIsFilterOpen}
        showChoseFilter={showChoseFilter}
        setTotalFilteredIdList={setTotalFilteredIdList}
      />
      {isFilterOpen && <FilterContainer setIsFilterOpen={setIsFilterOpen} setShowChoseFilter={setShowChoseFilter} />}
      {isLoading ? (
        <div>loading......</div>
      ) : (
        <CocktailContainer
          resultData={
            filterCocktailTotalResult.length === 0
              ? alcoholicResult || categoryResult || ingredientResult
              : filterCocktailTotalResult
          }
          errorMessage={errorMessage}
        />
      )}
    </div>
  )
}

export default Search

// 레이아웃 만들기
// 재검색시 검색결과 초기화
// filterCase => 개수 의미 들어가기
