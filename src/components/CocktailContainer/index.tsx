import { Suspense } from 'react'
import { ICocktailData } from 'types/types'

import styles from './cocktailContainer.module.scss'

interface ICocktailContainerProps {
  totalResult: ICocktailData[]
  errorMessage: string
}

const CocktailContainer = ({ totalResult, errorMessage }: ICocktailContainerProps) => {
  return (
    <div className={styles.cocktailContainer}>
      {!totalResult.length ? (
        <div>{errorMessage}</div>
      ) : (
        totalResult.map((cocktail) => {
          return (
            <Suspense key={cocktail.idDrink} fallback='loading...'>
              <div className={styles.cocktailCard}>
                <img alt={`${cocktail.strDrink}-img`} src={cocktail.strDrinkThumb} />
                <div className={styles.cocktailName}>{cocktail.strDrink}</div>
              </div>
            </Suspense>
          )
        })
      )}
    </div>
  )
}

export default CocktailContainer

// noimg 이미지
// skeleton 만들기
