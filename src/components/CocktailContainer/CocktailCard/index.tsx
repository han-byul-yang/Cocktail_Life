import { useNavigate } from 'react-router-dom'

import useTargetIntersect from 'hooks/useTargetIntersect'
import { ICocktailData } from 'types/cocktailDataType'

import styles from './cocktailCard.module.scss'

interface ICocktailCardProps {
  cocktailResult: ICocktailData | undefined
  rank: number | false
}

const CocktailCard = ({ cocktailResult, rank }: ICocktailCardProps) => {
  const { intersectTarget, isInterSecting } = useTargetIntersect()
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
        <img alt={`${cocktailResult?.strDrink}-img`} src={isInterSecting ? cocktailResult?.strDrinkThumb : undefined} />
        <p className={styles.cocktailName}>{cocktailResult?.strDrink}</p>
      </button>
    </li>
  )
}

export default CocktailCard
