import { IFilteredResultData } from 'types/types'

export const useFilterDatas = (cocktailFilteredDatas: IFilteredResultData, cocktailFilteredList: any) => {
  let finalResult = cocktailFilteredList[0]

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < Object.keys(cocktailFilteredDatas).length; i++) {
    finalResult = finalResult.filter((x: string) => cocktailFilteredList[i + 1].includes(x))
  }
}

export const useFilter = (idList: string[]) => {
  const idObject: any = {}

  idList.forEach((element) => {
    if (idObject[element]) idObject[element] += idObject[element] + 1
    else idObject[element] = 1
  })

  return Object.keys(idObject).filter((ele) => idObject[ele] > 1)
}
