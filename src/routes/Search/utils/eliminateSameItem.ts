const eliminateSameItem = (combinedItemList: (string | never)[], count: number) => {
  const itemKeyObject: any = {}

  if (combinedItemList.length === 0) throw Error('검색어를 입력해주세요')

  combinedItemList.forEach((item) => {
    if (itemKeyObject[item]) itemKeyObject[item] += 1
    else itemKeyObject[item] = 1
  })
  const noSameItemList = Object.keys(itemKeyObject).filter((ele) => itemKeyObject[ele] === count)

  if (noSameItemList.length === 0) {
    throw Error('검색된 결과가 없습니다')
  }

  return noSameItemList
}

export default eliminateSameItem

// 재사용할 수 있고 직해가 가능한 로직으로 다시 생각해보기
