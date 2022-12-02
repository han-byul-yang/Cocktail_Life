import { useQuery } from '@tanstack/react-query'

import { cocktailApis } from 'services/getCocktailApis'
import { IQueryKeys } from 'types/queryKeyType'
import getApiData from 'utils/getApiData'

const queryKeys: IQueryKeys = {
  searchByAlcoholicQuery: { queryName: 'searchByAlcoholicApi', api: cocktailApis.filterByAlcoholic },
  searchByCategoryQuery: { queryName: 'searchByCategoryApi', api: cocktailApis.filterByCategory },
  searchByIngredientQuery: { queryName: 'searchByIngredientApi', api: cocktailApis.filterByIngredients },
}

const useSearchQuery = (searchQuery: string | null, key: string) => {
  const query = useQuery([queryKeys[key].queryName, searchQuery], () => getApiData(queryKeys[key].api, searchQuery!), {
    select: (res) => res.drinks,
    enabled: !!searchQuery,
  })

  return query
}

export default useSearchQuery

export const useSearchByIdCocktailQuery = (resultId: string) => {
  const query = useQuery(['searchByIdCocktailApi', resultId], () => getApiData(cocktailApis.searchById, resultId!), {
    select: (res) => res.drinks[0],
  })

  return query
}
