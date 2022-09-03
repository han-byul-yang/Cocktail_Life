import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { cocktailApis } from 'services/getApis'
import { ICocktailData } from 'types/types'
import getApiData from 'utils/getApiData'

const useSearchByParams = () => {
  const [searchResult, setSearchResult] = useState<ICocktailData[]>([])
  const [searchParams] = useSearchParams()

  const ingredientParams = searchParams.get('ingredient')
  const alcoholicParams = searchParams.get('alcoholic')
  const categoryParams = searchParams.get('category')

  if (ingredientParams)
    getApiData(cocktailApis.filterByIngredients, ingredientParams).then((result) => setSearchResult(result.drinks))
  if (alcoholicParams)
    getApiData(cocktailApis.filterByAlcoholic, alcoholicParams).then((result) => setSearchResult(result.drinks))
  if (categoryParams)
    getApiData(cocktailApis.filterByCategory, categoryParams).then((result) => setSearchResult(result.drinks))

  return { searchResult }
}

export default useSearchByParams
