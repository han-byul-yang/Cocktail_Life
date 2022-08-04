import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { popularCocktailApi, cocktailApi } from 'services/getData'

const TopRated = () => {
  /* const { data, isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      console.log(res.data)
    },
  }) */

  useEffect(() => {
    axios.get('https://www.thecocktaildb.com/images/ingredients/gin-Small.png').then((res) => console.log(res.data))
  }, [])

  return <div>TopRated</div>
}

export default TopRated
