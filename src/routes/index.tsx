import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import Popular from './Popular'
import Search from './Search'
import Result from './Result'

import Layout from 'components/Layout'

import styles from './routes.module.scss'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.background}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<Popular />} />
            <Route element={<Layout />}>
              <Route path='search' element={<Search />} />
              <Route path='result' element={<Result />} />
            </Route>
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  )
}

export default App
