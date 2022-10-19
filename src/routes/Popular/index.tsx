import { useQuery } from '@tanstack/react-query'

import { popularCocktailApi } from 'services/getCocktailApis'
import CocktailContainer from 'components/CocktailContainer'

const Popular = () => {
  const { isLoading, data: popularCocktailData } = useQuery(['popularCocktailApi'], popularCocktailApi, {
    retry: 1,
    select: (res) => res.data.drinks,
  })

  return isLoading ? <div>isLoading.....</div> : <CocktailContainer resultData={popularCocktailData} type='popular' />
}

export default Popular
