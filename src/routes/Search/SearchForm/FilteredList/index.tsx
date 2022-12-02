import { IFilterKind } from 'types/filterKindType'

import { FilterIcon } from 'assets/svgs'
import styles from './filteredList.module.scss'

interface IFilteredListProps {
  showChoseFilter: IFilterKind
}

const FilteredList = ({ showChoseFilter }: IFilteredListProps) => {
  return (
    <div className={styles.filterList}>
      <FilterIcon className={styles.filterIcon} />
      <ul>
        {Object.keys(showChoseFilter).map((filterKey) => (
          <li key={filterKey}>
            {filterKey}: {showChoseFilter[filterKey]} /
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilteredList
