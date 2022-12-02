import { useSearchParams } from 'react-router-dom'

import { useSearchByIdCocktailQuery } from 'hooks/query/useSearchCocktailQuery'
import Description from 'routes/Detail/Description'

import styles from './detail.module.scss'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const resultId = searchParams.get('id')

  const { data: CocktailDetailData } = useSearchByIdCocktailQuery(resultId!)

  return (
    <div className={styles.detailPage}>
      <Description cocktailDetailData={CocktailDetailData} />
    </div>
  )
}

export default Detail
