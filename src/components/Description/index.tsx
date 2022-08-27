import { ICocktailData } from 'types/types'

import styles from './description.module.scss'

interface IDescriptionProps {
  cocktailData: ICocktailData
  iList: number
}

const Description = ({ cocktailData, iList }: IDescriptionProps) => {
  const {
    strDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strTags,
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
  } = cocktailData
  const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]
  const ingredientList = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
  return (
    <div className={styles.description}>
      <div className={styles.name}>
        Rank #{iList + 1}
        <br />
        {strDrink}
      </div>

      <div className={styles.basicInfo}>
        <div className={styles.alcoholic}>{strAlcoholic}</div>
        <div className={styles.category}>{strCategory}</div>
      </div>

      <p>~~MEASURE~~</p>
      {measureList.map((measure, iMeasure) => {
        const measureKey = `measure-${iMeasure}`
        return (
          <div key={`measure-${measureKey}`} className={styles.measure}>
            {measure}
          </div>
        )
      })}

      <p>~~INSTRUCTION~~</p>
      <div className={styles.instruction}>{strInstructions}</div>

      <p>~~INGREDIENT~~</p>
      <div className={styles.ingredientBox}>
        {ingredientList.map((ingredient, iIngredient) => {
          const ingredientKey = `ingredient-${iIngredient}`
          return (
            <div key={ingredientKey} className={styles.ingredient}>
              {ingredient !== null && (
                <>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                    alt='ingredient-img'
                  />
                  <div>{ingredient}</div>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className={styles.tagBox}>
        {strTags?.split(',').map((tag, iTag) => {
          const tagKey = `tag-${iTag}`
          return (
            <div key={tagKey} className={styles.tag}>
              {tag}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Description
