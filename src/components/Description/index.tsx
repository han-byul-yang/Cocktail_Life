import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ICocktailData } from 'types/types'
import Button from 'components/Button'

import styles from './description.module.scss'

interface IDescriptionProps {
  cocktailData: ICocktailData
  iList?: number
}

const Description = ({ cocktailData, iList }: IDescriptionProps) => {
  const {
    strDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strTags,
    strDrinkThumb,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
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
  } = cocktailData
  const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]

  const [ingredientList, setIngredientList] = useState<(string | null)[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setIngredientList([strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5])
  }, [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5])

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

  const handleMoveSearchClick = (kind: string, params: string) => {
    navigate(`/search?${kind}=${params}`)
  }

  return (
    <div className={styles.descriptionContainer}>
      <img src={strDrinkThumb} alt={`${strDrink}-img`} className={styles.img} />
      <div className={styles.description}>
        <div className={styles.name}>
          {(iList || iList === 0) && <div>Rank #{iList + 1}</div>}
          {strDrink}
        </div>

        <div className={styles.basicInfo}>
          <Button handleClick={() => handleMoveSearchClick('alcoholic', strAlcoholic)} size='small'>
            {strAlcoholic}
          </Button>
          <Button handleClick={() => handleMoveSearchClick('category', strCategory)} size='small'>
            {strCategory}
          </Button>
        </div>

        <p>~~MEASURE~~</p>
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

        <p>~~INSTRUCTION~~</p>
        <div className={styles.instruction}>{strInstructions}</div>

        <p>~~INGREDIENT~~</p>
        <ul className={styles.ingredientBox}>
          {ingredientList.map((ingredient, iIngredient) => {
            const ingredientKey = `ingredient-${iIngredient}`
            return (
              ingredient !== null && (
                <li key={ingredientKey}>
                  <button
                    className={styles.ingredient}
                    type='button'
                    onClick={() => handleMoveSearchClick('ingredient', ingredient)}
                  >
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                      alt={`${ingredient}-img`}
                    />
                    <div>{ingredient}</div>
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

        <ul className={styles.tagBox}>
          {strTags?.split(',').map((tag, iTag) => {
            const tagKey = `tag-${iTag}`
            return (
              <li key={tagKey} className={styles.tag}>
                {tag}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(Description)
