import { NavLink } from 'react-router-dom'

import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <NavLink
          to='/search'
          className={({ isActive }) =>
            `${styles.navLink} + ${isActive ? styles.activatedLink : styles.nonActivatedLink}`
          }
        >
          <li>SEARCH</li>
        </NavLink>
        <NavLink to='/' className={({ isActive }) => `${isActive ? styles.activatedLink : styles.nonActivatedLink}`}>
          <li>POPULAR</li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default GNB

// Link, li 순서 확인하기
