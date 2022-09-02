import React, { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import getApiData from 'utils/getApiData'
import eliminateSameItem from './utils/eliminateSameItem'
import { cocktailApis } from 'services/getApis'
import { alcoholicList, categoryList, ingredientList } from 'store/initialData/initialListData'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { filteredItemAtom } from 'store/atom'
import { ICocktailData, IFilteredCocktailData, IFilterKind } from 'types/types'
import FilterBox from './FilterBox'
import Button from 'components/Button'

import { FilterIcon } from 'assets/svgs'
import styles from './search.module.scss'

const CocktailContainer = React.lazy(() => import('components/CocktailContainer'))

const Search = () => {
  const filtering = useRecoilValue(filteredItemAtom)
  const filteringReset = useResetRecoilState(filteredItemAtom)
  const [showFilter, setShowFilter] = useState<IFilterKind>(filteringInitialData)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([''])
  const [totalResult, setTotalResult] = useState<ICocktailData[]>([])
  const [inputKeyword, setInputKeyword] = useState('')
  const [errorMessage, setErrorMessage] = useState('검색결과가 없습니다')
  const [filterOpen, setFilterOpen] = useState(false)
  // const inputRef = useRef(null)
  const dataRef = useRef<ICocktailData[]>([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const ingredientSearch = searchParams.get('ingredient')

    if (ingredientSearch)
      getApiData(cocktailApis.filterByIngredients, ingredientSearch).then((result) => setTotalResult(result.drinks))
  }, [searchParams])

  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  const cocktailDataToIdList = (resultData: (ICocktailData | IFilteredCocktailData)[] | null | undefined) => {
    if (resultData === null || resultData === undefined) throw Error('검색결과가 없습니다')

    return resultData.map((cocktailData: ICocktailData | IFilteredCocktailData) => cocktailData.idDrink)
  }

  const handleSearchClick = async () => {
    setTotalResult([])

    const combinedIdLists: string[] = []
    let filterKindCount = 0

    try {
      if (inputKeyword !== '') {
        filterKindCount += 1

        await getApiData(cocktailApis.searchByName, inputKeyword)
          .then((result) => cocktailDataToIdList(result.drinks))
          .then((result) => combinedIdLists.push(...result))
      }

      if (filtering.alcoholic !== '') {
        filterKindCount += 1

        await getApiData(cocktailApis.filterByAlcoholic, filtering.alcoholic)
          .then((result) => cocktailDataToIdList(result.drinks))
          .then((result) => combinedIdLists.push(...result))
      }

      if (filtering.category !== '') {
        filterKindCount += 1

        await getApiData(cocktailApis.filterByCategory, filtering.category)
          .then((result) => cocktailDataToIdList(result.drinks))
          .then((result) => combinedIdLists.push(...result))
      }

      if (filtering.ingredient !== '') {
        filterKindCount += 1
        await getApiData(cocktailApis.filterByIngredients, filtering.ingredient)
          .then((result) => cocktailDataToIdList(result.drinks))
          .then((result) => combinedIdLists.push(...result))
      }

      const filteredIdList = eliminateSameItem(combinedIdLists, filterKindCount)
      setTotalFilteredIdList(filteredIdList)
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    const searchedCocktailList = totalFilteredIdList.map(async (filteredId) => {
      const searchedData = await getApiData(cocktailApis.searchById, filteredId)
      return searchedData.drinks[0]
    })
    Promise.all(searchedCocktailList).then((res) => setTotalResult(res))
  }, [totalFilteredIdList])

  const handleApplyFilterClick = () => {
    setFilterOpen(false)
    setShowFilter(filtering)
  } // 함수 이름에 맞게 수정 필요

  const handleCancelFilterClick = () => {
    setFilterOpen(false)
    filteringReset()
  }

  const handleOpenFilterClick = () => {
    setFilterOpen(true)
  }

  return (
    <div className={styles.searchPage}>
      <form className={styles.searchForm}>
        <input
          type='search'
          placeholder='Input cocktail name ...'
          value={inputKeyword}
          onChange={handleInputKeywordChange}
        />

        <div className={styles.filterList}>
          <FilterIcon className={styles.filterIcon} />
          {Object.keys(showFilter).map((filterKey) => (
            <div key={filterKey}>
              {filterKey}: {showFilter[filterKey]} /
            </div>
          ))}
        </div>

        <Button handleClick={handleOpenFilterClick} size='big'>
          FILTER
        </Button>
        <Button handleClick={handleSearchClick} size='big'>
          SEARCH
        </Button>
      </form>

      {filterOpen && (
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
      )}

      <Suspense fallback={<div>loading...</div>}>
        <CocktailContainer totalResult={totalResult} errorMessage={errorMessage} />
      </Suspense>
    </div>
  )
}

export default Search

// 레이아웃 만들기
// 재검색시 검색결과 초기화
// filterCase => 개수 의미 들어가기
// handleApplyFilterClick함수에 showfilter 기능이 아닌 recoil에 filter를 적용하는 기능 부분 넣기
