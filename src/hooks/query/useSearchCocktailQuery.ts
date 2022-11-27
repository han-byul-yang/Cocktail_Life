import { useQuery } from '@tanstack/react-query'

import { cocktailApis } from 'services/getCocktailApis'
import getApiData from 'utils/getApiData'

export const useSearchByAlcoholicQuery = (query: string | null) => {
  const { isLoading, data } = useQuery(
    ['searchByAlcoholicParam', query],
    () => getApiData(cocktailApis.filterByAlcoholic, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, data }
}

export const useSearchByCategoryQuery = (query: string | null) => {
  const { isLoading, data } = useQuery(
    ['searchByCategoryParam', query],
    () => getApiData(cocktailApis.filterByCategory, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, data }
}

export const useSearchByIngredientQuery = (query: string | null) => {
  const { isLoading, data } = useQuery(
    ['searchByIngredientParam', query],
    () => getApiData(cocktailApis.filterByIngredients, query!),
    {
      select: (res) => res.drinks,
      enabled: !!query,
    }
  )

  return { isLoading, data }
}
