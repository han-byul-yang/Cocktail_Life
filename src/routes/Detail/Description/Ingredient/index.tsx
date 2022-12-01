import { useState } from 'react'

import { ICocktailData } from 'types/cocktailDataType'

import ingredientImg from 'assets/img/lime.webp'
import styles from './ingredient.module.scss'

interface IIngredientProps {
  cocktailDetailData: ICocktailData
  handleSearchKeywordClick: (kind: string, params: string) => void
}

const Ingredient = ({ cocktailDetailData, handleSearchKeywordClick }: IIngredientProps) => {
  const {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  } = cocktailDetailData

  const [ingredientList, setIngredientList] = useState<(string | null)[]>([
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  ])

  const handleShowMoreIngredientClick = () => {
    setIngredientList((prevList) =>
      prevList.length === 5
        ? [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
          ]
        : [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
    )
  }
  return (
    <>
      <div className={styles.titleContainer}>
        <img loading='lazy' alt='ingredientImg' src={ingredientImg} />
        INGREDIENT
      </div>
      <ul className={styles.ingredientBox}>
        {ingredientList.map((ingredient, iIngredient) => {
          const ingredientKey = `ingredient-${iIngredient}`
          return (
            ingredient !== null && (
              <li key={ingredientKey}>
                <button
                  className={styles.ingredient}
                  type='button'
                  onClick={() => handleSearchKeywordClick('ingredient', ingredient)}
                >
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                    alt={`${ingredient}-img`}
                  />
                  <p>{ingredient}</p>
                </button>
              </li>
            )
          )
        })}
        {strIngredient6 !== null && (
          <button type='button' onClick={handleShowMoreIngredientClick}>
            {ingredientList?.length === 5 ? 'see more' : 'close'}
          </button>
        )}
      </ul>
    </>
  )
}

export default Ingredient
