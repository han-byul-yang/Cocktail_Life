import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { popularCocktailApi } from 'services/getData'

const Popular = () => {
  /* const { data, isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      console.log(res.data)
    },
  }) */

  return <div>TopRated</div>
}

export default Popular
