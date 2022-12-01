import { ICocktailData } from 'types/cocktailDataType'
import CocktailCard from './CocktailCard'

import styles from './cocktailContainer.module.scss'

interface ICocktailContainerProps {
  resultData: (ICocktailData | undefined)[]
  type?: string
}

const CocktailContainer = ({ resultData, type }: ICocktailContainerProps) => {
  return (
    <div className={styles.cocktailContainer}>
      {!resultData?.length ? (
        <p className={styles.message}>검색된 결과가 없습니다.</p>
      ) : (
        <>
          <div>{type !== 'popular' && 'YOUR SEARCH RESULT ...'}</div>
          <ul className={styles.resultBox}>
            {resultData.map((cocktailResult, index) => {
              return (
                <CocktailCard
                  key={cocktailResult?.idDrink}
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

export default CocktailContainer

// noimg 이미지
// skeleton 만들기
