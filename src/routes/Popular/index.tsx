import axios from 'axios'
import { useEffect, useState } from 'react'
// import Slider from 'react-slick'
import { useQuery } from 'react-query'

import { popularCocktailApi } from 'services/getData'

import styles from './popular.module.scss'

const Popular = () => {
  /* const { data, isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      console.log(res.data)
    },
  }) */

  return (
    <div className={styles.background}>
      <div className={styles.container} />
    </div>
  )
}

export default Popular
