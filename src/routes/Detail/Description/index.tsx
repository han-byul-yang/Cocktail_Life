import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { clickedSearchKeywordAtom } from 'store/atom'
import { ICocktailData } from 'types/cocktailDataType'
import Button from 'components/Button'

import styles from './description.module.scss'

interface IDescriptionProps {
  cocktailDetailData: ICocktailData
}

const Description = ({ cocktailDetailData }: IDescriptionProps) => {
  const setClickedSearchKeyword = useSetRecoilState(clickedSearchKeywordAtom)
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
  } = cocktailDetailData
  const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]
  const [ingredientList, setIngredientList] = useState<(string | null)[]>([
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  ])
  const navigate = useNavigate()

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

  const handleSearchKeywordClick = (kind: string, params: string) => {
    setClickedSearchKeyword({ [kind]: params })
    navigate(
      `/search?alcoholic=${kind === 'alcoholic' && params}&category=${kind === 'category' && params}&ingredient=${
        kind === 'ingredient' && params
      }`
    )
  }

  return (
    <div className={styles.descriptionContainer}>
      <img src={strDrinkThumb} alt={`${strDrink}-img`} className={styles.img} />
      <div className={styles.description}>
        <p className={styles.name}>{strDrink}</p>

        <div className={styles.basicInfo}>
          <Button handleClick={() => handleSearchKeywordClick('alcoholic', strAlcoholic)} size='small'>
            {strAlcoholic}
          </Button>
          <Button handleClick={() => handleSearchKeywordClick('category', strCategory)} size='small'>
            {strCategory}
          </Button>
        </div>

        <p className={styles.title}>~~MEASURE~~</p>
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

        <p className={styles.title}>~~INSTRUCTION~~</p>
        <p className={styles.instruction}>{strInstructions}</p>

        <p className={styles.title}>~~INGREDIENT~~</p>
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
