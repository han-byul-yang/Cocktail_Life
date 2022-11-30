import { ICocktailData } from 'types/cocktailDataType'

import styles from './measure.module.scss'

interface IMeasureProps {
  cocktailDetailData: ICocktailData
}

const Measure = ({ cocktailDetailData }: IMeasureProps) => {
  const { strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5 } = cocktailDetailData
  const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]

  return (
    <>
      <p className={styles.title}>~~MEASURE~~</p>
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
