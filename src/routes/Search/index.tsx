import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useGetCocktailByIdQuery } from 'hooks/query/useFilterCocktailQuery'
import {
  useSearchByAlcoholicQuery,
  useSearchByCategoryQuery,
  useSearchByIngredientQuery,
} from 'hooks/query/useSearchCocktailQuery'
import { clickedSearchKeywordAtom, isOpenErrorModalAtom } from 'store/atom'
import { filtersInitialData } from 'constants/initialApiData'
import { IFilterKind } from 'types/filterKindType'
import SearchBar from './SearchBar'
import CocktailContainer from 'components/CocktailContainer'
import FilterContainer from './FilterContainer'

import styles from './search.module.scss'
import ModalPortal from 'components/ErrorModal/modalPortal'
import ErrorModal from 'components/ErrorModal'

const Search = () => {
  const [showChoseFilter, setShowChoseFilter] = useState<IFilterKind>(filtersInitialData)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([])
  const clickedSearchKeyword = useRecoilValue(clickedSearchKeywordAtom)
  const isOpenErrorModal = useRecoilValue(isOpenErrorModalAtom)

  const { resultData: filterCocktailTotalResult } = useGetCocktailByIdQuery(
    totalFilteredIdList,
    totalFilteredIdList.length !== 0
  )

  const { data: alcoholicResult } = useSearchByAlcoholicQuery(clickedSearchKeyword.alcoholic)
  const { data: categoryResult } = useSearchByCategoryQuery(clickedSearchKeyword.category)
  const { data: ingredientResult } = useSearchByIngredientQuery(clickedSearchKeyword.ingredient)

  return (
    <>
      <div className={styles.searchPage}>
        <SearchBar
          setFilterOpen={setIsFilterOpen}
          showChoseFilter={showChoseFilter}
          setTotalFilteredIdList={setTotalFilteredIdList}
        />
        {isFilterOpen && <FilterContainer setIsFilterOpen={setIsFilterOpen} setShowChoseFilter={setShowChoseFilter} />}

        <CocktailContainer
          resultData={
            filterCocktailTotalResult.length === 0
              ? alcoholicResult || categoryResult || ingredientResult
              : filterCocktailTotalResult
          }
        />
      </div>
      {isOpenErrorModal && (
        <ModalPortal>
          <ErrorModal />
        </ModalPortal>
      )}
    </>
  )
}

export default Search

// 레이아웃 만들기
// 재검색시 검색결과 초기화
// filterCase => 개수 의미 들어가기
