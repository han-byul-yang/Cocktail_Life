import React, { ChangeEvent, Dispatch } from 'react'

import styles from '../searchForm.module.scss'

interface ISearchBarProps {
  inputKeyword: string
  setInputKeyword: Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ inputKeyword, setInputKeyword }: ISearchBarProps) => {
  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  return (
    <input
      className={styles.searchInput}
      type='search'
      placeholder='Input cocktail name ...'
      value={inputKeyword}
      onChange={handleInputKeywordChange}
    />
  )
}

export default SearchBar
