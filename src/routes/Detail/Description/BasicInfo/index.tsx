import { ICocktailData } from 'types/cocktailDataType'
import Button from 'components/Button'

import styles from './basicInfo.module.scss'

interface IBasicInfoProps {
  cocktailDetailData: ICocktailData
  handleSearchKeywordClick: (kind: string, params: string) => void
}

const BasicInfo = ({ cocktailDetailData, handleSearchKeywordClick }: IBasicInfoProps) => {
  const { strAlcoholic, strCategory } = cocktailDetailData

  return (
    <div className={styles.basicInfo}>
      <Button handleClick={() => handleSearchKeywordClick('alcoholic', strAlcoholic)} size='small'>
        {strAlcoholic}
      </Button>
      <Button handleClick={() => handleSearchKeywordClick('category', strCategory)} size='small'>
        {strCategory}
      </Button>
    </div>
  )
}

export default BasicInfo
