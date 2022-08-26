import { ICocktailData } from 'types/types'

import styles from 'cocktailCard.module.scss'

interface ICocktailCardProps {
  cocktail: ICocktailData
}

const CocktailCard = ({ cocktail }: ICocktailCardProps) => {
  return (
    <div className={styles.cocktailCard}>
      <img alt={`${cocktail?.strDrink}-img`} src={cocktail?.strImageSource === null ? '' : cocktail?.strImageSource} />
      <div className={styles.cocktailName}>{cocktail?.strDrink}</div>
    </div>
  )
}

export default CocktailCard
