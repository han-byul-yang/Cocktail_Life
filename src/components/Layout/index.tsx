import { Outlet } from 'react-router-dom'
import GNB from 'components/GNB'

const Layout = () => {
  return (
    <>
      <header>
        <h1>COCKTAIL LIFE</h1>
        <GNB />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
