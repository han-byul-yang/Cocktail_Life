interface IFilterButtonsProps {
  filterKind: string
  filterList: string[]
  handleFilterItemClick: (filterKind: null | string, filterItem: null | string) => void
}

const FilterBox = ({ filterKind, filterList, handleFilterItemClick }: IFilterButtonsProps) => {
  return (
    <div>
      {filterKind.toUpperCase()}
      {filterList.map((item: string, iItem: number) => {
        const itemKey = `item-${iItem}`
        return (
          <button key={itemKey} type='button' onClick={() => handleFilterItemClick(filterKind, item)}>
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default FilterBox

// handleFilterChooseClick type 재설정
