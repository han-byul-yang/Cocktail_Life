import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import getApiData from 'utils/getApiData'
import { cocktailApis } from 'services/getApis'
import { alcoholicList, categoryList, ingredientList } from 'store/initialData/initialListData'
import { filteredItemAtom } from 'store/atom'
import { IFilteredCocktailData } from 'types/types'
import FilterBox from './FilterBox'

import styles from './search.module.scss'

const Search = () => {
  const filtering = useRecoilValue(filteredItemAtom)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([''])
  const [inputKeyword, setInputKeyword] = useState('')
  // const inputRef = useRef(null)

  const handleInputKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.currentTarget.value)
  }

  const cocktailDataToIdList = (resultData: { drinks: IFilteredCocktailData[] }) => {
    return resultData.drinks.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
  }

  const eliminateSameItem = (combinedItemList: string[], count: number) => {
    const itemKeyObject: any = {}

    combinedItemList.forEach((item) => {
      if (itemKeyObject[item]) itemKeyObject[item] += itemKeyObject[item] + 1
      else itemKeyObject[item] = 1
    })

    const noSameItemList = Object.keys(itemKeyObject).filter((ele) => itemKeyObject[ele] > count)

    return noSameItemList
  }

  const handleSearchButtonClick = async () => {
    const combinedIdLists = []
    let filterKindCount = 0

    if (inputKeyword !== '') {
      filterKindCount += 1

      const filteredByNameData = await getApiData(cocktailApis.searchByName, inputKeyword)
      const filteredNameIdList = cocktailDataToIdList(filteredByNameData)
      combinedIdLists.push(...filteredNameIdList)
    }

    if (filtering.alcoholic !== '') {
      filterKindCount += 1

      const filteredByAlcoholicData = await getApiData(cocktailApis.filterByAlcoholic, filtering.alcoholic)
      const filteredAlcoholicIdList = cocktailDataToIdList(filteredByAlcoholicData)
      combinedIdLists.push(...filteredAlcoholicIdList)
    }

    if (filtering.category !== '') {
      filterKindCount += 1

      const filteredByCategoryData = await getApiData(cocktailApis.filterByCategory, filtering.category)
      const filteredCategoryIdList = cocktailDataToIdList(filteredByCategoryData)
      combinedIdLists.push(...filteredCategoryIdList)
    }

    if (filtering.ingredient !== '') {
      filterKindCount += 1

      const filteredByIngredientData = await getApiData(cocktailApis.filterByIngredients, filtering.ingredient)
      const filteredIngredientIdList = cocktailDataToIdList(filteredByIngredientData)
      combinedIdLists.push(...filteredIngredientIdList)
    }

    /* const combinedIdLists = [
      ...filteredNameIdList,
      ...filteredAlcoholicIdList,
      ...filteredCategoryIdList,
      ...filteredIngredientIdList,
    ] */
    console.log(combinedIdLists)

    // setTotalFilteredIdList(eliminateSameItem(combinedIdLists, filterKindCount))
  }

  useEffect(() => {
    const dd = (d: string) => {
      const data = getApiData(cocktailApis.searchById, d)
      return data
    }
    const aa = totalFilteredIdList.map((id) => {
      const a = dd(id)
      return a
    })
    console.log(aa)
  }, [totalFilteredIdList])

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
      </main>
    </div>
  )
}

export default Search

// 레이아웃 만들기
