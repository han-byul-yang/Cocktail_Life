import React, { Suspense } from 'react'

import { ICocktailData } from 'types/types'
import CocktailCard from './CocktailCard'

import styles from './cocktailContainer.module.scss'

interface ICocktailContainerProps {
  totalResult: ICocktailData[]
  errorMessage: string
  type?: string
}

const CocktailContainer = ({ totalResult, type, errorMessage }: ICocktailContainerProps) => {
  return (
    <div className={styles.cocktailContainer}>
      {!totalResult?.length ? (
        <div className={styles.errorMessage}>{errorMessage}</div>
      ) : (
        <>
          <div>YOUR SEARCH RESULT ...</div>
          <ul className={styles.resultBox}>
            {totalResult.map((cocktailResult, index) => {
              return (
                <CocktailCard
                  key={cocktailResult.idDrink}
                  rank={type === 'popular' && index + 1}
                  cocktailResult={cocktailResult}
                />
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
