import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { cocktailApis } from 'services/getApis'
import getApiData from 'utils/getApiData'
import { cocktailInitialData } from 'store/initialData/initialApiData'
import { ICocktailData } from 'types/types'
import Description from 'components/Description'

import styles from './result.module.scss'

const Result = () => {
  const [resultData, setResultData] = useState<ICocktailData>(cocktailInitialData)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const resultId = searchParams.get('id')

    getApiData(cocktailApis.searchById, resultId!).then((result) => setResultData(result.drinks[0]))
  }, [searchParams])

  return (
    <div className={styles.resultPage}>
      <Description cocktailData={resultData} iList={0} />
    </div>
  )
}

export default Result
