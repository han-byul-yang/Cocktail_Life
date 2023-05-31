import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useGetCocktailByIdQuery } from 'hooks/query/useFilterCocktailQuery'
import useSearchQuery from 'hooks/query/useSearchCocktailQuery'
import { clickedSearchKeywordAtom, isOpenErrorModalAtom } from 'store/atom'
import { filtersInitialData } from 'constants/initialApiData'
import { IFilterKind } from 'types/filterKindType'
import SearchForm from './SearchForm'
import CocktailContainer from 'components/CocktailContainer'
import FilterContainer from './FilterContainer'
import ErrorModal from 'components/ErrorModal'
import ModalPortal from 'components/ErrorModal/modalPortal'

import styles from './search.module.scss'

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

  const { data: alcoholicResult } = useSearchQuery(clickedSearchKeyword.alcoholic, 'searchByAlcoholicQuery')
  const { data: categoryResult } = useSearchQuery(clickedSearchKeyword.category, 'searchByCategoryQuery')
  const { data: ingredientResult } = useSearchQuery(clickedSearchKeyword.ingredient, 'searchByIngredientQuery')

  return (
    <>
      <div className={styles.searchPage}>
        <SearchForm
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
