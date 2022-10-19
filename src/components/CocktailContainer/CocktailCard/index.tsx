import { useNavigate } from 'react-router-dom'

import { ICocktailData } from 'types/cocktailDataType'

import styles from './cocktailCard.module.scss'

interface ICocktailCardProps {
  cocktailResult: ICocktailData | undefined
  rank: number | false
}

const CocktailCard = ({ cocktailResult, rank }: ICocktailCardProps) => {
  const navigate = useNavigate()

  const handleCocktailCardClick = (cocktailId: string | undefined, cocktailName: string | undefined) => {
    navigate(`/detail?id=${cocktailId}&name=${cocktailName}`) // params set 으로 수정
  }

  return (
    <li>
      <button
        className={styles.cocktailCard}
        type='button'
        onClick={() => handleCocktailCardClick(cocktailResult?.idDrink, cocktailResult?.strDrink)}
      >
        {rank && <p>RANK.{rank}</p>}
        <img alt={`${cocktailResult?.strDrink}-img`} src={cocktailResult?.strDrinkThumb} />
        <p className={styles.cocktailName}>{cocktailResult?.strDrink}</p>
      </button>
    </li>
  )
}

export default CocktailCard
