import { Outlet } from 'react-router-dom'

import GNB from 'components/GNB'

import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <header>
        <h1>COCKTAIL LIFE</h1>
        <GNB />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
