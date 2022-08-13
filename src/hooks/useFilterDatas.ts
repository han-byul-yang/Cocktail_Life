import { IfilteredResultData } from 'types/types'

const useFilterDatas = (cocktailFilteredDatas: IfilteredResultData, cocktailFilteredList: any) => {
  let finalResult = cocktailFilteredList[0]

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < Object.keys(cocktailFilteredDatas).length; i++) {
    finalResult = finalResult.filter((x: string) => cocktailFilteredList[i + 1].includes(x))
  }
}

export default useFilterDatas
