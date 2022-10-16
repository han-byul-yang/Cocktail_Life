import { ChangeEvent, Dispatch } from 'react'

import { IFilterKind } from 'types/types'
import Button from 'components/Button'

import { FilterIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  inputKeyword: string
  setInputKeyword: Dispatch<React.SetStateAction<string>>
  setFilterOpen: Dispatch<React.SetStateAction<boolean>>
  showChoseFilter: IFilterKind
  setIsSearchClick: Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = ({
  inputKeyword,
  setInputKeyword,
  setFilterOpen,
  showChoseFilter,
  setIsSearchClick,
}: ISearchBarProps) => {
  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  const handleOpenFilterClick = () => {
    setFilterOpen(true)
  }

  const handleSearchClick = async () => {
    setIsSearchClick(true)
    /* navigate(
      `/search?alcoholic=${filtering.alcoholic}&category=${filtering.category}&ingredient=${filtering.ingredient}`
    ) */
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
