import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { cocktailApis, getApiData } from 'services/getCocktailApis'
import Description from 'routes/Detail/Description'

import styles from './detail.module.scss'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const resultId = searchParams.get('id')

  const { isLoading, data: CocktailDetailData } = useQuery(
    ['searchByIdCocktailApi', resultId],
    () => getApiData(cocktailApis.searchById, resultId!),
    {
      select: (res) => res.drinks[0],
    }
  )

  return (
    <div className={styles.detailPage}>
      {isLoading ? <div>loading...</div> : <Description cocktailDetailData={CocktailDetailData} />}
    </div>
  )
}

export default Detail
