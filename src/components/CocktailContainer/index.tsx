import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import { ICocktailData } from 'types/types'

import styles from './cocktailContainer.module.scss'

interface ICocktailContainerProps {
  totalResult: ICocktailData[]
  errorMessage: string
}

const CocktailContainer = ({ totalResult, errorMessage }: ICocktailContainerProps) => {
  const navigate = useNavigate()

  const handleCocktailCardClick = (cocktailName: string) => {
    navigate(`/result?name=${cocktailName}`)
  }

  return (
    <div className={styles.cocktailContainer}>
      {!totalResult.length ? (
        <div>{errorMessage}</div>
      ) : (
        totalResult.map((cocktail) => {
          return (
            <Suspense key={cocktail.idDrink} fallback='loading...'>
              <button
                className={styles.cocktailCard}
                type='button'
                onClick={() => handleCocktailCardClick(cocktail.strDrink)}
              >
                <img alt={`${cocktail.strDrink}-img`} src={cocktail.strDrinkThumb} />
                <div className={styles.cocktailName}>{cocktail.strDrink}</div>
              </button>
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
