import { FormEvent, useState, useEffect } from 'react'
import { useQuery } from 'react-query'

import { cocktailApis } from 'services/getData'
import {
  cocktailInitialData,
  alcoholicList,
  categoryList,
  ingredientList,
  filteringInitialData,
  filteredResultInitialData,
} from 'services/initialData'
import { IfilteredResultData, Ifiltering } from 'types/types'

import styles from './search.module.scss'

const Search = () => {
  const [inputKeyWord, setInputKeyWord] = useState('')
  const [filtering, setFiltering] = useState<Ifiltering>(filteringInitialData)
  const [filteredResultDatas, setFilteredResultDatas] = useState<IfilteredResultData>(filteredResultInitialData)
  const [searchedData, setsearchedData] = useState([cocktailInitialData])
  const [isClicked, setIsClicked] = useState(false)

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

  const handleSearchButtonClick = async () => {
    if (inputKeyWord !== '') {
      await cocktailApis.searchByName(inputKeyWord).then((res) =>
        setFilteredResultDatas((prevResultData) => {
          return {
            ...prevResultData,
            name: res.data.drinks,
          }
        })
      )
    }

    if (filtering.alcoholic !== null) {
      await cocktailApis.filterByAlcoholic(filtering.alcoholic).then((res) =>
        setFilteredResultDatas((prevResultData) => {
          return {
            ...prevResultData,
            alcoholic: res.data.drinks,
          }
        })
      )
    }

    if (filtering.category !== null) {
      await cocktailApis.filterByCategory(filtering.category).then((res) =>
        setFilteredResultDatas((prevResultData) => {
          return {
            ...prevResultData,
            category: res.data.drinks,
          }
        })
      )
      setIsClicked(true)
    }

    if (filtering.ingredient !== null) {
      cocktailApis.filterByIngredients(filtering.ingredient).then((res) =>
        setFilteredResultDatas((prevResultData) => {
          return {
            ...prevResultData,
            ingredient: res.data.drinks,
          }
        })
      )
    }
  }

  useEffect(() => {
    const alcoholics = filteredResultDatas.alcoholic.map((ele) => ele.strDrink)
    const categorys = filteredResultDatas.category.map((ele) => ele.strDrink)
    const names = filteredResultDatas.name.map((ele) => ele.strDrink)
    const ingredients = filteredResultDatas.ingredient.map((ele) => ele.strDrink)
    const filter1 = alcoholics.filter((ele) => categorys.includes(ele))
    const filter2 = names.filter((ele) => ingredients.includes(ele))
    const filterFinally = filter1.filter((ele) => filter2.includes(ele))
  }, [
    filteredResultDatas.alcoholic,
    filteredResultDatas.category,
    filteredResultDatas.ingredient,
    filteredResultDatas.name,
    filtering.ingredient,
  ])

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
