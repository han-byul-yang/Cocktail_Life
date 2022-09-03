export interface ICocktailData {
  dateModified: null | string
  idDrink: string
  strAlcoholic: string
  strCategory: string
  strCreativeCommonsConfirmed: null | string
  strDrink: string
  strDrinkAlternate: null | string
  strDrinkThumb: string
  strGlass: null | string
  strIBA: null | string
  strImageAttribution: null | string
  strImageSource: null | string
  strIngredient1: null | string
  strIngredient2: null | string
  strIngredient3: null | string
  strIngredient4: null | string
  strIngredient5: null | string
  strIngredient6: null | string
  strIngredient7: null | string
  strIngredient8: null | string
  strIngredient9: null | string
  strIngredient10: null | string
  strIngredient11: null | string
  strIngredient12: null | string
  strIngredient13: null | string
  strIngredient14: null | string
  strIngredient15: null | string
  strInstructions: null | string
  strInstructionsDE: null | string
  strInstructionsES: null | string
  strInstructionsFR: null | string
  strInstructionsIT: null | string
  'strInstructionsZH-HANS': null | string
  'strInstructionsZH-HANT': null | string
  strMeasure1: null | string
  strMeasure2: null | string
  strMeasure3: null | string
  strMeasure4: null | string
  strMeasure5: null | string
  strMeasure6: null | string
  strMeasure7: null | string
  strMeasure8: null | string
  strMeasure9: null | string
  strMeasure10: null | string
  strMeasure11: null | string
  strMeasure12: null | string
  strMeasure13: null | string
  strMeasure14: null | string
  strMeasure15: null | string
  strTags: null | string
  strVideo: null | string
}

interface IFilteredCocktailData {
  idDrink: string
  strDrink: string
  strDrinkThumb: null | string
}

export interface IFilterKind {
  [filterKind: string]: string
}

export interface IFilteredResultData {
  name: ICocktailData[]
  alcoholic: IFilteredCocktailData[]
  category: IFilteredCocktailData[]
  ingredient: IfilteredCocktailData[]
}
