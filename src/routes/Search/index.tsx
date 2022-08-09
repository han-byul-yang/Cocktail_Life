import { FormEvent, useState } from 'react'

import styles from './search.module.scss'

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <header>
        <div>COCKTAIL LIFE</div>
        <nav>Navigation</nav>
      </header>
      <main>
        <input type='search' value={searchKeyword} onChange={handleInputChange} />
      </main>
    </div>
  )
}

export default Search

// 레이아웃 만들기
