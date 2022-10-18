import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import { cocktailApis, getApiData } from 'services/getCocktailApis'
import Description from 'components/Description'

import styles from './result.module.scss'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const resultId = searchParams.get('id')

  const { isFetching, data: CocktailDetailData } = useQuery(
    ['searchByIdCocktailApi', resultId],
    () => getApiData(cocktailApis.searchById, resultId!),
    {
      select: (res) => res.drinks[0],
    }
  )

  return (
    <div className={styles.resultPage}>
      <Description cocktailDetailData={CocktailDetailData} />
    </div>
  )
}

export default Detail
