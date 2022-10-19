import { NavLink } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'

import { clickedSearchKeywordAtom } from 'store/atom'

import styles from './gnb.module.scss'

const GNB = () => {
  const resetClickedSearchKeyword = useResetRecoilState(clickedSearchKeywordAtom)

  const handleSearchGnbClick = () => {
    resetClickedSearchKeyword()
  }

  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink
            to='/search'
            className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.nonActivatedLink}`)}
            onClick={handleSearchGnbClick}
          >
            SEARCH
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.nonActivatedLink}`)}
          >
            POPULAR
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
