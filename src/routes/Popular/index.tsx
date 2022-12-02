import { useGetPopularCocktailQuery } from 'hooks/query/usePopularQuery'
import CocktailContainer from 'components/CocktailContainer'

import styles from './popular.module.scss'

const Popular = () => {
  const { data: popularCocktailData } = useGetPopularCocktailQuery()

  return (
    <div className={styles.popularPage}>
      <CocktailContainer resultData={popularCocktailData} type='popular' />
    </div>
  )
}

export default Popular
