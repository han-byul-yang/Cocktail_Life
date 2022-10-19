import { useQuery } from '@tanstack/react-query'

import { popularCocktailApi } from 'services/getCocktailApis'
import CocktailContainer from 'components/CocktailContainer'

import styles from './popular.module.scss'

const Popular = () => {
  const { isLoading, data: popularCocktailData } = useQuery(['popularCocktailApi'], popularCocktailApi, {
    retry: 1,
    select: (res) => res.data.drinks,
  })

  return (
    <div className={styles.popularPage}>
      {isLoading ? <div>isLoading.....</div> : <CocktailContainer resultData={popularCocktailData} type='popular' />}
    </div>
  )
}

export default Popular
