import { useEffect, useRef, useState } from 'react'

import getApiData from 'utils/getApiData'
import { cocktailApis } from 'services/getApis'
import { alcoholicList, categoryList, ingredientList } from 'store/initialData/initialListData'
import { filteringInitialData } from 'store/initialData/initialApiData'
import { IFilterKind, IFilteredCocktailData } from 'types/types'

import styles from './search.module.scss'
import FilterBox from './FilterBox'

const Search = () => {
  const [filtering, setFiltering] = useState<IFilterKind>(filteringInitialData)
  const [totalFilteredIdList, setTotalFilteredIdList] = useState<string[]>([''])
  const inputRef = useRef(null)

  const handleFilterItemClick = (filterKind: null | string, filterItem: null | string) => {
    switch (filterKind) {
      case 'alcoholic':
        setFiltering((prevFilter) => {
          return { ...prevFilter, alcoholic: filterItem }
        })
        break
      case 'category':
        setFiltering((prevFilter) => {
          return { ...prevFilter, category: filterItem }
        })
        break
      case 'ingredient':
        setFiltering((prevFilter) => {
          return {
            ...prevFilter,
            ingredient: prevFilter.ingredient !== null ? `${prevFilter.ingredient}, ${filterItem}` : filterItem,
          }
        })
        break
    }
  }

  const eliminateSameItem = (combinedItemList: string[]) => {
    const itemKeyObject: any = {}

    combinedItemList.forEach((item) => {
      if (itemKeyObject[item]) itemKeyObject[item] += itemKeyObject[item] + 1
      else itemKeyObject[item] = 1
    })

    const noSameItemList = Object.keys(itemKeyObject).filter((ele) => itemKeyObject[ele] > 1)

    return noSameItemList
  }

  const handleSearchButtonClick = async () => {
    let filteredNameIdList = []
    let filteredAlcoholicIdList = []
    let filteredCategoryIdList = []
    let filteredIngredientIdList = []

    if (inputRef.current !== null && inputRef.current !== '') {
      const filteredByNameData = await getApiData(cocktailApis.searchByName, inputRef.current)
      filteredNameIdList = filteredByNameData.drinks.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
    }

    if (filtering.alcoholic !== null) {
      const filteredByAlcoholicData = await getApiData(cocktailApis.filterByAlcoholic, filtering.alcoholic)
      filteredAlcoholicIdList = filteredByAlcoholicData.drinks.map(
        (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
      )
    }

    if (filtering.category !== null) {
      const filteredByCategoryData = await getApiData(cocktailApis.filterByCategory, filtering.category)
      filteredCategoryIdList = filteredByCategoryData.drinks.map(
        (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
      )
    }

    if (filtering.ingredient !== null) {
      const filteredByIngredientData = await getApiData(cocktailApis.filterByIngredients, filtering.ingredient)
      filteredIngredientIdList = filteredByIngredientData.drinks.map(
        (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
      )
    }

    const combinedIdLists = [
      ...filteredNameIdList,
      ...filteredAlcoholicIdList,
      ...filteredCategoryIdList,
      ...filteredIngredientIdList,
    ]

    setTotalFilteredIdList(eliminateSameItem(combinedIdLists))
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
          <input type='search' ref={inputRef} />
          <button type='button' onClick={handleSearchButtonClick}>
            SEARCH
          </button>
        </form>

        <div className={styles.filterContainer}>
          <FilterBox filterKind='alcoholic' filterList={alcoholicList} handleFilterItemClick={handleFilterItemClick} />

          <FilterBox filterKind='category' filterList={categoryList} handleFilterItemClick={handleFilterItemClick} />

          <FilterBox
            filterKind='ingredient'
            filterList={ingredientList}
            handleFilterItemClick={handleFilterItemClick}
          />
        </div>
      </main>
    </div>
  )
}

export default Search

// 레이아웃 만들기
