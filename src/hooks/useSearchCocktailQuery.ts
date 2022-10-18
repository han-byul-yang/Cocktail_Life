import { useQuery } from 'react-query'

import { cocktailApis, getApiData } from 'services/getCocktailApis'

export const useSearchByAlcoholicParamQuery = (query: string | null) => {
  const { isLoading, isFetching, data } = useQuery(
    ['searchByAlcoholicParam', query],
    () => getApiData(cocktailApis.filterByAlcoholic, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, isFetching, data }
}

export const useSearchByCategoryParamQuery = (query: string | null) => {
  const { isLoading, isFetching, data } = useQuery(
    ['searchByCategoryParam', query],
    () => getApiData(cocktailApis.filterByCategory, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, isFetching, data }
}

export const useSearchByIngredientParamQuery = (query: string | null) => {
  const { isLoading, isFetching, data } = useQuery(
    ['searchByIngredientParam', query],
    () => getApiData(cocktailApis.filterByIngredients, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, isFetching, data }
}
