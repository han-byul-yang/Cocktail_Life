import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import { popularCocktailApi } from 'services/getApis'
import { cocktailInitialData } from 'store/initialData/initialApiData'
import { ICocktailData } from 'types/types'
import { cocktailDataAtom } from 'store/atom'
import Description from 'components/Description'

import styles from './popular.module.scss'

const Popular = () => {
  const [cocktailList, setCocktailList] = useRecoilState(cocktailDataAtom)
  const [selectedRankBox, setSelectedRankBox] = useState(0)
  // const [cocktailData, setCocktailData] = useState<ICocktailData[]>([cocktailInitialData])

  /* const { isFetching } = useQuery('popularCocktailApi', popularCocktailApi, {
    onSuccess: (res) => {
      setCocktailList(res.data.drinks)
      console.log(res.data)
    },
  }) */

  const handleRankBoxClick = (e: any) => {
    setSelectedRankBox(Number(e.currentTarget.value))
  }

  return (
    <>
      <div className={styles.showBox}>
        <div className={styles.container} style={{ top: -(selectedRankBox * 800) }}>
          {cocktailList.map((cocktailData, iList) => {
            const { idDrink, strDrink, strDrinkThumb } = cocktailData

            return (
              <div key={idDrink} className={styles.cocktailRankBox}>
                <img src={strDrinkThumb} alt={`${strDrink}-img`} className={styles.img} />

                <Description cocktailData={cocktailData} iList={iList} />

                <form className={styles.buttonForm}>
                  {new Array(10).fill(undefined).map((ele, iRadio) => {
                    const radioKey = `radio-${iRadio}`
                    return (
                      <input
                        key={radioKey}
                        type='radio'
                        name='pageSelect'
                        value={iRadio}
                        id={`pageButton-${iRadio}`}
                        onChange={handleRankBoxClick}
                        checked={iRadio === selectedRankBox}
                      />
                    )
                  })}
                </form>
              </div>
            )
          })}
        </div>
      </div>
      <Link to='search'>
        <button type='button' className={styles.moveSearchPageButton}>
          SEARCH COCKTAIL &gt;
        </button>
      </Link>
    </>
  )
}

export default Popular

// new Array(10).fill(undefinde) 한 이유
// radio type
// inital data 지저분
// data split 10개 까지
// form 태그 필요?
