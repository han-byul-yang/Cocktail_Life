import axios from 'axios'
import { useEffect, useState } from 'react'
// import Slider from 'react-slick'
import { useQuery } from 'react-query'
import { mapQueryStatusFilter } from 'react-query/types/core/utils'

import { popularCocktailApi } from 'services/getData'
import { ICocktailData } from 'types/types'

import styles from './popular.module.scss'

const Popular = () => {
  const [cocktailData, setCocktailData] = useState<ICocktailData[]>()
  /* const { data, isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      setCocktailData(data)
    },
  })
*/
  return (
    <div className={styles.background}>
      {cocktailData?.map((datas) => {
        return (
          <div key={datas.idDrink} className={styles.container}>
            <img src={datas.strDrinkThumb} alt='cocktail-img' />
            <div>dd</div>
          </div>
        )
      })}
    </div>
  )
}

export default Popular
