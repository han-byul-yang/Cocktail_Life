import { AxiosResponse } from 'axios'
import { FormEvent, useState, useEffect } from 'react'
import { useQuery } from 'react-query'

import { cocktailApis } from 'services/getApis'
import {
  alcoholicList,
  categoryList,
  ingredientList,
  filteringInitialData,
  filteredResultInitialData,
} from 'services/initialData'
import { IFilteredResultData, IFilterKind, IFilteredCocktailData } from 'types/types'

import styles from './search.module.scss'

const Search = () => {
  const [inputKeyWord, setInputKeyWord] = useState('')
  const [filtering, setFiltering] = useState<IFilterKind>(filteringInitialData)
  const [filteredResultDatas, setFilteredResultDatas] = useState<IFilteredResultData>(filteredResultInitialData)

  /* const { isFetching } = useQuery('cocktailApis', cocktailApis.searchByName('Mojito'), {
    onSuccess: (res) => {
      console.log(res.data)
    },
  }) */

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputKeyWord(e.currentTarget.value)
  }

  const handleFilterChooseClick = (filterKind: null | string, filterTarget: null | string) => {
    switch (filterKind) {
      case 'alcoholic':
        setFiltering((prevFilter) => {
          return { ...prevFilter, alcoholic: filterTarget }
        })
        break
      case 'category':
        setFiltering((prevFilter) => {
          return { ...prevFilter, category: filterTarget }
        })
        break
      case 'ingredient':
        setFiltering((prevFilter) => {
          return {
            ...prevFilter,
            ingredient: prevFilter.ingredient !== null ? `${prevFilter.ingredient}, ${filterTarget}` : filterTarget,
          }
        })
        break
    }
  }

  const getApiData = async (api: (params: string) => Promise<AxiosResponse<any, any>>, params: string) => {
    const callApi = await api(params)

    return callApi.data
  }

  const eliminateSameItem = (combinedItemList: number[]) => {
    const itemKeyObject: any = {}

    combinedItemList.forEach((item) => {
      if (itemKeyObject[item]) itemKeyObject[item] += itemKeyObject[item] + 1
      else itemKeyObject[item] = 1
    })

    const noSameItemList = Object.keys(itemKeyObject).filter((ele) => itemKeyObject[ele] > 1)

    return noSameItemList
  }

  const handleSearchButtonClick = async () => {
    let filteredByNameData
    let filteredByAlcoholicData
    let filteredByCategoryData
    let filteredByIngredientData

    if (inputKeyWord !== '') {
      filteredByNameData = await getApiData(cocktailApis.searchByName, inputKeyWord)
    }

    if (filtering.alcoholic !== null) {
      filteredByAlcoholicData = await getApiData(cocktailApis.filterByAlcoholic, filtering.alcoholic)
    }

    if (filtering.category !== null) {
      filteredByCategoryData = await getApiData(cocktailApis.filterByCategory, filtering.category)
    }

    if (filtering.ingredient !== null) {
      filteredByIngredientData = await getApiData(cocktailApis.filterByIngredients, filtering.ingredient)
    }

    const filteredNameIdList = filteredByNameData.drinks.map(
      (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
    )
    const filteredAlcoholicIdList = filteredByAlcoholicData.drinks.map(
      (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
    )
    const filteredCategoryIdList = filteredByCategoryData.drinks.map(
      (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
    )
    const filteredIngredientIdList = filteredByIngredientData.drinks.map(
      (cocktailData: IFilteredCocktailData) => cocktailData.idDrink
    )

    const combinedIdLists = [
      ...filteredNameIdList,
      ...filteredAlcoholicIdList,
      ...filteredCategoryIdList,
      ...filteredIngredientIdList,
    ]

    eliminateSameItem(combinedIdLists)
  }

  /* const objectResultToIdList = useCallback(
    (kind: string) => {
      const cocktailIdList = filteredResultDatas[kind].map((ele: IFilteredCocktailData | ICocktailData) => ele.strDrink)
      return cocktailIdList
    },
    [filteredResultDatas]
  ) */

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>COCKTAIL LIFE</h1>
        <nav>Navigation</nav>
      </header>
      <main>
        <form>
          <input type='search' value={inputKeyWord} onChange={handleInputChange} />
          <button type='button' onClick={handleSearchButtonClick}>
            SEARCH
          </button>
        </form>

        <div className={styles.filterBox}>
          <div>
            ALCOHOLIC
            {alcoholicList.map((alcoholic) => {
              return (
                <button key={alcoholic} type='button' onClick={() => handleFilterChooseClick('alcoholic', alcoholic)}>
                  {alcoholic}
                </button>
              )
            })}
          </div>

          <div>
            CATEGORY
            {categoryList.map((category) => {
              return (
                <button key={category} type='button' onClick={() => handleFilterChooseClick('category', category)}>
                  {category}
                </button>
              )
            })}
          </div>

          <div>
            INGREDIENT
            {ingredientList.map((ingredient) => {
              return (
                <button
                  key={ingredient}
                  type='button'
                  onClick={() => handleFilterChooseClick('ingredient', ingredient)}
                >
                  {ingredient}
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Search

// 레이아웃 만들기
