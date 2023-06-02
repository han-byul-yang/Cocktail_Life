import { Dispatch, FormEvent, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { IFilterKind } from 'types/filterKindType'
import { useGetCocktailByNameQuery, useFilterCocktailQuery } from 'hooks/query/useFilterCocktailQuery'
import eliminateSameItem from 'utils/eliminateSameItem'
import errorMessages from 'constants/errorMessages'
import { errorMessageAtom, filteredItemAtom, isOpenErrorModalAtom } from 'store/atom'
import Button from 'components/Button'
import FilteredList from './FilteredList'
import SearchBar from './SearchBar'

import styles from './searchForm.module.scss'

interface ISearchFormProps {
  setFilterOpen: Dispatch<React.SetStateAction<boolean>>
  showChoseFilter: IFilterKind
  setTotalFilteredIdList: Dispatch<React.SetStateAction<string[]>>
}

const SearchForm = ({ setFilterOpen, showChoseFilter, setTotalFilteredIdList }: ISearchFormProps) => {
  const [isSearchClick, setIsSearchClick] = useState(false)
  const [inputKeyword, setInputKeyword] = useState('')
  const filters = useRecoilValue(filteredItemAtom)
  const setIsOpenErrorModal = useSetRecoilState(isOpenErrorModalAtom)
  const setErrorMessage = useSetRecoilState(errorMessageAtom)
  const navigate = useNavigate()

  const { data: searchByNameIdResult } = useGetCocktailByNameQuery(inputKeyword, isSearchClick)
  const { data: filterByAlcoholicIdResult } = useFilterCocktailQuery(
    filters.alcoholic,
    isSearchClick,
    'filterByAlcoholicQuery'
  )
  const { data: filterByCategoryIdResult } = useFilterCocktailQuery(
    filters.category,
    isSearchClick,
    'filterByCategoryQuery'
  )
  const { data: filterByIngredientIdResult } = useFilterCocktailQuery(
    filters.ingredient,
    isSearchClick,
    'filterByIngredientQuery'
  )

  const getFilteredSearchCocktailIds = useCallback(() => {
    let filterKindCount = 0

    if (inputKeyword !== '') {
      filterKindCount += 1
    }
    if (filters.alcoholic !== '') {
      filterKindCount += 1
    }
    if (filters.category !== '') {
      filterKindCount += 1
    }
    if (filters.ingredient !== '') {
      filterKindCount += 1
    }

    const totalCocktailIdList = [
      ...(searchByNameIdResult || []),
      ...(filterByAlcoholicIdResult || []),
      ...(filterByCategoryIdResult || []),
      ...(filterByIngredientIdResult || []),
    ]
    return eliminateSameItem(totalCocktailIdList, filterKindCount)
  }, [
    filterByAlcoholicIdResult,
    filterByCategoryIdResult,
    filterByIngredientIdResult,
    filters.alcoholic,
    filters.category,
    filters.ingredient,
    inputKeyword,
    searchByNameIdResult,
  ])

  useEffect(() => {
    if (isSearchClick) {
      setTotalFilteredIdList(getFilteredSearchCocktailIds())
      setIsSearchClick(false)
    }
  }, [getFilteredSearchCocktailIds, isSearchClick, setTotalFilteredIdList])

  const handleOpenFilterClick = () => {
    setFilterOpen(true)
  }

  const handleSearchClick = () => {
    if (!inputKeyword && !filters.alcoholic && !filters.category && !filters.ingredient) {
      setIsOpenErrorModal(true)
      setErrorMessage(errorMessages.search.NO_SEARCH_KEYWORD)
    } else {
      setIsSearchClick(true)
      navigate(
        `/search?alcoholic=${filters.alcoholic || 'false'}&category=${filters.category || 'false'}ingredient=${
          filters.ingredient || 'false'
        }`
      )
    }
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearchClick()
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
      <SearchBar inputKeyword={inputKeyword} setInputKeyword={setInputKeyword} />
      <FilteredList showChoseFilter={showChoseFilter} />
      <Button handleClick={handleOpenFilterClick} size='big'>
        FILTER
      </Button>
      <Button handleClick={handleSearchClick} size='big'>
        SEARCH
      </Button>
    </form>
  )
}

export default memo(SearchForm)
