import { NavLink } from 'react-router-dom'

import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink
            to='/search'
            className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.nonActivatedLink}`)}
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

// Link, li 순서 확인하기
