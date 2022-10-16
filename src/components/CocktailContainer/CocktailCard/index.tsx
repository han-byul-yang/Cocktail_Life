import { useNavigate } from 'react-router-dom'

import { ICocktailData } from 'types/types'

import styles from './cocktailCard.module.scss'

interface ICocktailCardProps {
  cocktailResult: ICocktailData
  rank: number | false
}

const CocktailCard = ({ cocktailResult, rank }: ICocktailCardProps) => {
  const navigate = useNavigate()

  const handleCocktailCardClick = (cocktailId: string, cocktailName: string) => {
    /* const url = new URL('/result')
    const params = new URLSearchParams(url.search)
    params.set('id', cocktailId)
    params.set('name', cocktailName) */
    navigate(`/result?id=${cocktailId}&name=${cocktailName}`) // params set 으로 수정
  }

  return (
    <li>
      <button
        className={styles.cocktailCard}
        type='button'
        onClick={() => handleCocktailCardClick(cocktailResult.idDrink, cocktailResult.strDrink)}
      >
        <p>RANK.{rank}</p>
        <img alt={`${cocktailResult.strDrink}-img`} src={cocktailResult.strDrinkThumb} />
        <p className={styles.cocktailName}>{cocktailResult.strDrink}</p>
      </button>
    </li>
  )
}

export default CocktailCard
