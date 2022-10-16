import { useQueries, useQuery } from 'react-query'

import { cocktailApis, getApiData } from 'services/getCocktailApis'
import { ICocktailData, IFilteredCocktailData } from 'types/types'

export const useGetCocktailByNameQuery = (query: string, enableOption: boolean) => {
  const { isLoading, isFetching, data } = useQuery(
    ['searchByNameCocktailApi', enableOption],
    () => getApiData(cocktailApis.searchByName, query),
    {
      select: (res) => res?.drinks?.map((cocktailData: ICocktailData) => cocktailData.idDrink),
      enabled: enableOption,
    }
  )

  return { isLoading, isFetching, data }
}

export const useFilterByAlcoholicQuery = (query: string, enableOption: boolean) => {
  const { isLoading, isFetching, data } = useQuery(
    ['filterByAlcoholicApi', enableOption],
    () => getApiData(cocktailApis.filterByAlcoholic, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, isFetching, data }
}

export const useFilterByCategoryQuery = (query: string, enableOption: boolean) => {
  const { isLoading, isFetching, data } = useQuery(
    ['filterByCotegoryApi', enableOption],
    () => getApiData(cocktailApis.filterByCategory, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, isFetching, data }
}

export const useFilterByIngredientQuery = (query: string, enableOption: boolean) => {
  const { isLoading, isFetching, data } = useQuery(
    ['filterByIngredientApi', enableOption],
    () => getApiData(cocktailApis.filterByIngredients, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, isFetching, data }
}

export const useGetCocktailByIdQuery = (queries: string[], enableOption: boolean) => {
  const resultQueryData = useQueries(
    queries.map((query) => {
      return {
        queryKey: ['searchByIdCocktailApi', query, enableOption],
        queryFn: () => getApiData(cocktailApis.searchById, query),
        select: (res: { drinks: { 0: ICocktailData } }) => res?.drinks[0],
        enabled: enableOption,
      }
    })
  )

  const resultData = resultQueryData.map((queryData) => queryData.data)

  return { resultData }
}
