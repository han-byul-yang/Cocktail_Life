import { useNavigate } from 'react-router-dom'

import useTargetIntersect from 'hooks/useTargetIntersect'
import { ICocktailData } from 'types/cocktailDataType'

import styles from './cocktailCard.module.scss'

interface ICocktailCardProps {
  cocktailResult: ICocktailData | undefined
  rank: number | false
}

const options = {
  root: null,
  rootMargin: '200px',
}

const CocktailCard = ({ cocktailResult, rank }: ICocktailCardProps) => {
  const { intersectTarget, isInViewPort, isInterSecting } = useTargetIntersect(options)
  const navigate = useNavigate()

  const handleCocktailCardClick = (cocktailId: string | undefined, cocktailName: string | undefined) => {
    navigate(`/detail?id=${cocktailId}&name=${cocktailName}`)
  }

  return (
    <li ref={intersectTarget}>
      <button
        className={styles.cocktailCard}
        type='button'
        onClick={() => handleCocktailCardClick(cocktailResult?.idDrink, cocktailResult?.strDrink)}
      >
        {rank && <p>RANK.{rank}</p>}
        <img
          alt={`${cocktailResult?.strDrink}-img`}
          src={isInViewPort || isInterSecting ? cocktailResult?.strDrinkThumb : undefined}
        />
        <p className={styles.cocktailName}>{cocktailResult?.strDrink}</p>
      </button>
    </li>
  )
}

export default CocktailCard
