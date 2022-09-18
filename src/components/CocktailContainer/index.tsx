import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { ICocktailData } from 'types/types'

import styles from './cocktailContainer.module.scss'

interface ICocktailContainerProps {
  totalResult: ICocktailData[]
  errorMessage: string
}

const CocktailContainer = ({ totalResult, errorMessage }: ICocktailContainerProps) => {
  const navigate = useNavigate()

  const handleCocktailCardClick = (cocktailId: string, cocktailName: string) => {
    navigate(`/result?id=${cocktailId}&name=${cocktailName}`) // params set 으로 수정
  }

  return (
    <div className={styles.cocktailContainer}>
      {!totalResult?.length ? (
        <div className={styles.errorMessage}>{errorMessage}</div>
      ) : (
        <>
          <div>YOUR SEARCH RESULT ...</div>
          <ul className={styles.resultBox}>
            {totalResult.map((cocktail) => {
              return (
                <li key={cocktail.idDrink}>
                  <button
                    className={styles.cocktailCard}
                    type='button'
                    onClick={() => handleCocktailCardClick(cocktail.idDrink, cocktail.strDrink)}
                  >
                    <img alt={`${cocktail.strDrink}-img`} src={cocktail.strDrinkThumb} />
                    <div className={styles.cocktailName}>{cocktail.strDrink}</div>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default React.memo(CocktailContainer)

// noimg 이미지
// skeleton 만들기
