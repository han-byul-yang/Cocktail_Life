import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { cocktailApis } from 'services/getCocktailApis'
import getApiData from 'utils/getApiData'
import Description from 'routes/Detail/Description'

import styles from './detail.module.scss'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const resultId = searchParams.get('id')

  const { data: CocktailDetailData } = useQuery(
    ['searchByIdCocktailApi', resultId],
    () => getApiData(cocktailApis.searchById, resultId!),
    {
      cacheTime: 60 * 60 * 60,
      staleTime: 60 * 60 * 60,
      select: (res) => res.drinks[0],
    }
  )

  return (
    <div className={styles.detailPage}>
      <Description cocktailDetailData={CocktailDetailData} />
    </div>
  )
}

export default Detail
