import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { ICocktailData, IFilterKind } from 'types/types'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: localStorage,
})

export const cocktailDataAtom = atom<ICocktailData[]>({
  key: 'cocktailData',
  default: [
    {
      dateModified: '',
      idDrink: '',
      strAlcoholic: '',
      strCategory: '',
      strCreativeCommonsConfirmed: '',
      strDrink: '',
      strDrinkAlternate: '',
      strDrinkThumb: '',
      strGlass: '',
      strIBA: '',
      strImageAttribution: '',
      strImageSource: '',
      strIngredient1: '',
      strIngredient2: '',
      strIngredient3: '',
      strIngredient4: '',
      strIngredient5: '',
      strIngredient6: '',
      strIngredient7: '',
      strIngredient8: '',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strInstructions: '',
      strInstructionsDE: '',
      strInstructionsES: '',
      strInstructionsFR: '',
      strInstructionsIT: '',
      'strInstructionsZH-HANS': '',
      'strInstructionsZH-HANT': '',
      strMeasure1: '',
      strMeasure2: '',
      strMeasure3: '',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: '',
      strMeasure9: '',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strTags: '',
      strVideo: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
})

export const filteredItemAtom = atom<IFilterKind>({
  key: 'filteredItem',
  default: {
    alcoholic: '',
    category: '',
    ingredient: '',
  },
})
