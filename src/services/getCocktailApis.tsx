import axios, { AxiosResponse } from 'axios'

const POPULAR_COCKTAIL_API_URL = 'https://the-cocktail-db.p.rapidapi.com/popular.php'
const RAPID_API_KEY = '0f40b0457amsh95e66230e92672ep17b4c1jsn3a7564d6e110'
const RAPID_API_HOST = 'the-cocktail-db.p.rapidapi.com'

export const popularCocktailApi = async () => {
  const data = await axios.get(POPULAR_COCKTAIL_API_URL, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  })

  return data
}

const basicApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
})

export const cocktailApis = {
  searchById: (params: string) =>
    basicApi.get('/lookup.php', {
      params: {
        i: params,
      },
    }),
  searchByName: (params: string) =>
    basicApi.get('/search.php', {
      params: {
        s: params,
      },
    }),
  filterByCategory: (params: string) =>
    basicApi.get('/filter.php', {
      params: {
        c: params,
      },
    }),
  filterByAlcoholic: (params: string) =>
    basicApi.get('./filter.php', {
      params: {
        a: params,
      },
    }),
  filterByIngredients: (params: string) =>
    basicApi.get('./filter.php', {
      params: {
        i: params,
      },
    }),
  getIngredientList: () =>
    basicApi.get('./list.php', {
      params: {
        i: 'list',
      },
    }),
  getAlcoholicList: () =>
    basicApi.get('./list.php', {
      params: {
        a: 'list',
      },
    }),
  getCategoryList: () =>
    basicApi.get('./list.php', {
      params: {
        c: 'list',
      },
    }),
}

export const getApiData = async (api: (params: string) => Promise<AxiosResponse>, params: string) => {
  const { data } = await api(params)
  return data
}
