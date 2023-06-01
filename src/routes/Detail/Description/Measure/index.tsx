import { ICocktailData } from 'types/cocktailDataType'

import measureImg60 from 'assets/img/spoon@60w.webp'
import measureImg45 from 'assets/img/spoon@45w.webp'
import measureImg30 from 'assets/img/spoon@30w.webp'
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
        <img
          alt='measureImg'
          src={measureImg60}
          srcSet={`${measureImg60} 2000w, ${measureImg45} 1024w, ${measureImg30} 768w`}
        />
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
