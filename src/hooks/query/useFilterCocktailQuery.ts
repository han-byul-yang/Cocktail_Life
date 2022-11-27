import { useQueries, useQuery } from '@tanstack/react-query'

import { cocktailApis } from 'services/getCocktailApis'
import getApiData from 'utils/getApiData'
import { ICocktailData, IFilteredCocktailData } from 'types/cocktailDataType'

export const useGetCocktailByNameQuery = (query: string, enableOption: boolean) => {
  const { isLoading, data } = useQuery(
    ['searchByNameCocktailApi', enableOption],
    () => getApiData(cocktailApis.searchByName, query),
    {
      select: (res) => res?.drinks?.map((cocktailData: ICocktailData) => cocktailData.idDrink),
      enabled: enableOption,
    }
  )

  return { isLoading, data }
}

export const useFilterByAlcoholicQuery = (query: string, enableOption: boolean) => {
  const { isLoading, data } = useQuery(
    ['filterByAlcoholicApi', enableOption],
    () => getApiData(cocktailApis.filterByAlcoholic, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, data }
}

export const useFilterByCategoryQuery = (query: string, enableOption: boolean) => {
  const { isLoading, data } = useQuery(
    ['filterByCotegoryApi', enableOption],
    () => getApiData(cocktailApis.filterByCategory, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, data }
}

export const useFilterByIngredientQuery = (query: string, enableOption: boolean) => {
  const { isLoading, data } = useQuery(
    ['filterByIngredientApi', enableOption],
    () => getApiData(cocktailApis.filterByIngredients, query),
    {
      select: (res) => {
        return res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink)
      },
      enabled: enableOption,
    }
  )

  return { isLoading, data }
}

export const useGetCocktailByIdQuery = (queries: string[], enableOption: boolean) => {
  const resultQueryData = useQueries({
    queries: queries.map((query) => {
      return {
        queryKey: ['searchByIdCocktailApi', query, enableOption],
        queryFn: () => getApiData(cocktailApis.searchById, query),
        select: (res: { drinks: { 0: ICocktailData } }) => res?.drinks[0],
        enabled: enableOption,
      }
    }),
  })

  const resultData = resultQueryData.map((queryData) => queryData.data)
  const isLoading = resultQueryData.some((queryData) => queryData.isLoading)

  return { isLoading, resultData }
}
