import axios from 'axios'

const COCKTAIL_API_URL = 'https://the-cocktail-db.p.rapidapi.com/popular.php'
const RAPID_API_KEY = '0f40b0457amsh95e66230e92672ep17b4c1jsn3a7564d6e110'
const RAPID_API_HOST = 'the-cocktail-db.p.rapidapi.com'

export const popularCocktailApi = async () => {
  const data = await axios.get(COCKTAIL_API_URL, {
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  })

  return data
}

const basicApi = axios.create({
  baseURL: 'www.thecocktaildb.com/api/json/v1/1',
})

export const cocktailApi = {
  searchByName: (params: string) =>
    basicApi.get('/search.php', {
      params: {
        s: params,
      },
    }),
}
