import { useQueries, useQuery } from '@tanstack/react-query'

import { cocktailApis } from 'services/getCocktailApis'
import getApiData from 'utils/getApiData'
import { ICocktailData, IFilteredCocktailData } from 'types/cocktailDataType'
import { IQueryKeys } from 'types/queryKeyType'

const queryKeys: IQueryKeys = {
  filterByAlcoholicQuery: { queryName: 'searchByAlcoholicApi', api: cocktailApis.filterByAlcoholic },
  filterByCategoryQuery: { queryName: 'searchByCategoryApi', api: cocktailApis.filterByCategory },
  filterByIngredientQuery: { queryName: 'searchByIngredientApi', api: cocktailApis.filterByIngredients },
}

export const useFilterCocktailQuery = (filterQuery: string, enableOption: boolean, key: string) => {
  const query = useQuery([queryKeys[key].queryName, enableOption], () => getApiData(queryKeys[key].api, filterQuery), {
    select: (res) => res?.drinks?.map((cocktailData: IFilteredCocktailData) => cocktailData.idDrink),
    enabled: enableOption,
  })

  return query
}

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
