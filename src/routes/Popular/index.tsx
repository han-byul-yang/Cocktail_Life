import axios from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
// import Slider from 'react-slick'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { popularCocktailApi } from 'services/getData'
import { cocktailDataAtom } from 'store/atom'
import { ICocktailData } from 'types/types'

import styles from './popular.module.scss'

const Popular = () => {
  const [cocktailList, setCocktailList] = useRecoilState(cocktailDataAtom)
  const [selectedPage, setSelectedPage] = useState(0)
  const [cocktailData, setCocktailData] = useState<ICocktailData[]>([
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
  ])

  /* const { isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      setCocktailList(res.data.drinks)
      console.log(res.data)
    },
  }) */

  const handlePageClick = (e: any) => {
    setSelectedPage(e.currentTarget.value)
  }

  return (
    <div className={styles.background}>
      <div className={styles.showBox}>
        <div className={styles.container} style={{ top: -(selectedPage * 800) }}>
          {cocktailList.map((datas) => {
            return (
              <div key={datas.idDrink} className={styles.cocktailInfoBox}>
                <img src={datas.strDrinkThumb} alt='cocktail-img' className={styles.img} />
                <div className={styles.description}>{datas.strDrink}</div>
                <form>
                  {new Array(10).fill(undefined).map((ele, i) => {
                    const inputKey = i
                    return <input key={inputKey} type='radio' name='pageSelect' value={i} onChange={handlePageClick} />
                  })}
                </form>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Popular

// new Array(10).fill(undefinde) 한 이유
// radio type
// inital data 지저분
