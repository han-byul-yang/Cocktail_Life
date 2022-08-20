import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import getApiData from 'utils/getApiData'
import { cocktailApis } from 'services/getApis'
import { alcoholicList, categoryList, ingredientList } from 'store/initialData/initialListData'
import { cocktailInitialData } from 'store/initialData/initialApiData'
import { filteredItemAtom } from 'store/atom'
import { ICocktailData, IFilteredCocktailData } from 'types/types'
import FilterBox from './FilterBox'

import styles from './search.module.scss'

const Search = () => {
  const filtering = useRecoilValue(filteredItemAtom)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([''])
  const [totalResult, setTotalResult] = useState<ICocktailData[]>([cocktailInitialData])
  const [inputKeyword, setInputKeyword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // const inputRef = useRef(null)

  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  const cocktailDataToIdList = (resultData: { drinks: (ICocktailData | IFilteredCocktailData)[] }) => {
    return resultData.drinks.map((cocktailData: ICocktailData | IFilteredCocktailData) => cocktailData.idDrink)
  }

  const eliminateSameItem = (combinedItemList: (string | never)[], count: number) => {
    const itemKeyObject: any = {}

    if (combinedItemList.length === 0) throw Error()

    combinedItemList.forEach((item) => {
      if (itemKeyObject[item]) itemKeyObject[item] += 1
      else itemKeyObject[item] = 1
    })

    const noSameItemList = Object.keys(itemKeyObject).filter((ele) => itemKeyObject[ele] === count)
    return noSameItemList
  }

  const handleSearchButtonClick = async () => {
    const combinedIdLists: (string | never)[] = []
    let filterKindCount = 0

    if (inputKeyword !== '') {
      filterKindCount += 1

      await getApiData(cocktailApis.searchByName, inputKeyword)
        .then((result) => cocktailDataToIdList(result))
        .then((result2) => combinedIdLists.push(...result2))
        .catch((error) => {
          setErrorMessage('검색 결과가 없습니다')
        })
    }

    if (filtering.alcoholic !== '') {
      filterKindCount += 1

      await getApiData(cocktailApis.filterByAlcoholic, filtering.alcoholic)
        .then((result) => cocktailDataToIdList(result))
        .then((result2) => combinedIdLists.push(...result2))
        .catch((error) => {
          setErrorMessage('검색 결과가 없습니다')
        })
    }

    if (filtering.category !== '') {
      filterKindCount += 1

      await getApiData(cocktailApis.filterByCategory, filtering.category)
        .then((result) => cocktailDataToIdList(result))
        .then((result2) => combinedIdLists.push(...result2))
        .catch((error) => {
          setErrorMessage('검색 결과가 없습니다')
        })
    }

    if (filtering.ingredient !== '') {
      filterKindCount += 1

      await getApiData(cocktailApis.filterByIngredients, filtering.ingredient)
        .then((result) => cocktailDataToIdList(result))
        .then((result2) => combinedIdLists.push(...result2))
        .catch((error) => {
          setErrorMessage('검색 결과가 없습니다')
        })
    }

    try {
      const dd = eliminateSameItem(combinedIdLists, filterKindCount)
      console.log(combinedIdLists)
      setTotalFilteredIdList(dd)
    } catch {
      setErrorMessage('검색어를 입력해주세요')
    }
  }

  useEffect(() => {
    totalFilteredIdList.forEach((filteredId) => {
      getApiData(cocktailApis.searchById, filteredId).then((res) =>
        setTotalResult((prevResult) => [...prevResult, res.drinks])
      )
    })
  }, [totalFilteredIdList])

  useEffect(() => {
    console.log(totalResult)
  }, [totalResult])

  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>COCKTAIL LIFE</h1>
        <nav>Navigation</nav>
      </header>
      <main>
        <form>
          <input type='search' value={inputKeyword} onChange={handleInputKeywordChange} />
          <button type='button' onClick={handleSearchButtonClick}>
            SEARCH
          </button>
        </form>

        <div className={styles.filterContainer}>
          <FilterBox filterKind='alcoholic' filterList={alcoholicList} filterCase='single' />

          <FilterBox filterKind='category' filterList={categoryList} filterCase='single' />

          <FilterBox filterKind='ingredient' filterList={ingredientList} filterCase='multiple' />
        </div>

        <div>
          {totalResult.map((gg, i) => {
            return <div key={i}>{gg?.idDrink}</div>
          })}
        </div>
      </main>
    </div>
  )
}

export default Search

// 레이아웃 만들기
