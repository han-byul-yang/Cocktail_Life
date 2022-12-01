import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { clickedSearchKeywordAtom } from 'store/atom'
import { ICocktailData } from 'types/cocktailDataType'
import BasicInfo from './BasicInfo'
import Measure from './Measure'
import Instruction from './Instruction'
import Ingredient from './Ingredient'
import Tags from './Tags'

import styles from './description.module.scss'

interface IDescriptionProps {
  cocktailDetailData: ICocktailData
}

const Description = ({ cocktailDetailData }: IDescriptionProps) => {
  const setClickedSearchKeyword = useSetRecoilState(clickedSearchKeywordAtom)
  const navigate = useNavigate()
  const { strDrink, strTags, strDrinkThumb, strInstructions } = cocktailDetailData

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
      <img src={strDrinkThumb} alt={`${strDrink}-img`} className={styles.cocktailImg} />

      <div className={styles.description}>
        <p className={styles.name}>{strDrink}</p>
        <BasicInfo cocktailDetailData={cocktailDetailData} handleSearchKeywordClick={handleSearchKeywordClick} />
        <Measure cocktailDetailData={cocktailDetailData} />
        <Instruction strInstructions={strInstructions} />
        <Ingredient cocktailDetailData={cocktailDetailData} handleSearchKeywordClick={handleSearchKeywordClick} />
        <Tags strTags={strTags} />
      </div>
    </div>
  )
}

export default React.memo(Description)
