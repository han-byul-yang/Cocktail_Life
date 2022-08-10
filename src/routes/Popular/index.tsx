import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { popularCocktailApi } from 'services/getData'
import { cocktailInitialData } from 'services/initialData'
import { ICocktailData } from 'types/types'
import { cocktailDataAtom } from 'store/atom'

import styles from './popular.module.scss'
import { Link } from 'react-router-dom'

const Popular = () => {
  const [cocktailList, setCocktailList] = useRecoilState(cocktailDataAtom)
  const [selectedRankBox, setSelectedRankBox] = useState(0)
  const [cocktailData, setCocktailData] = useState<ICocktailData[]>([cocktailInitialData])

  /* const { isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      setCocktailList(res.data.drinks)
      console.log(res.data)
    },
  }) */

  const handleRankBoxClick = (e: any) => {
    setSelectedRankBox(Number(e.currentTarget.value))
  }

  const handleMoveSearchPageClick = () => {}

  return (
    <>
      <div className={styles.showBox}>
        <div className={styles.container} style={{ top: -(selectedRankBox * 800) }}>
          {cocktailList.map((datas, iList) => {
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
            } = datas
            const measureList = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5]
            const ingredientList = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]

            return (
              <div key={datas.idDrink} className={styles.cocktailRankBox}>
                <img src={datas.strDrinkThumb} alt='cocktail-img' className={styles.img} />
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
                <form>
                  {new Array(10).fill(undefined).map((ele, iRadio) => {
                    const radioKey = `radio-${iRadio}`
                    return (
                      <input
                        key={radioKey}
                        type='radio'
                        name='pageSelect'
                        value={iRadio}
                        id={`pageBtn-${iRadio}`}
                        onChange={handleRankBoxClick}
                        checked={iRadio === selectedRankBox}
                      />
                    )
                  })}
                </form>
              </div>
            )
          })}
        </div>
      </div>
      <Link to='search'>
        <button type='button' className={styles.moveSearchPageBtn} onClick={handleMoveSearchPageClick}>
          SEARCH COCKTAIL &gt;
        </button>
      </Link>
    </>
  )
}

export default Popular

// new Array(10).fill(undefinde) 한 이유
// radio type
// inital data 지저분
// data split 10개 까지
