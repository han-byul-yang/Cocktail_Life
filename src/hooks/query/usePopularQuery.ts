import { useQuery } from '@tanstack/react-query'

import { popularCocktailApi } from 'services/getCocktailApis'

export const useGetPopularCocktailQuery = () => {
  const query = useQuery(['popularCocktailApi'], popularCocktailApi, {
    select: (res) => res.data.drinks,
  })

  return query
}
