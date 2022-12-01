import { ICocktailData } from 'types/cocktailDataType'

import measureImg from 'assets/img/spoon.webp'
import styles from './measure.module.scss'

interface IMeasureProps {
  cocktailDetailData: ICocktailData
}

const Measure = ({ cocktailDetailData }: IMeasureProps) => {
  const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5 } = cocktailDetailData
  const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]

  return (
    <>
      <div className={styles.titleContainer}>
        <img loading='lazy' alt='measureImg' src={measureImg} />
        MEASURE
      </div>
      <ul>
        {measureList.map((measure, iMeasure) => {
          const measureKey = `measure-${iMeasure}`
          return (
            <li key={`measure-${measureKey}`} className={styles.measure}>
              {measure}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Measure
